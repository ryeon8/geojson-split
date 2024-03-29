#!/usr/bin/env node

/**
 * 국토교통부에서 공개한 (B100)국토통계_공시지가-공시지가-리경계_전국_202207 SHP > geojson 파일을 gid 별로 json으로 분리하는 패키지.
 * npx gjs {파일 경로} {추출 경로}로 이용 가능.
 * 
 * @author r3n
 * @since 2024. 03. 04.
 * @see http://map.ngii.go.kr/ms/map/NlipMap.do?tabGb=statsMap
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const lodash = require('lodash');
const { lcj } = require('legal-code-jsonizer');

function splitGeoJson(filePath, exportDir) {
  if (!filePath) {
    console.log('no geojson file. please visit http://map.ngii.go.kr/ms/map/NlipMap.do?tabGb=statsMap to export SHP, and transform info geojson.');
    return;
  }

  if (!exportDir) {
    console.log('no {exportDir} parameter. all split files will be saved into the default dir(cwd + export). ');
  }

  const fileStream = fs.createReadStream(filePath);

  // 분리된 json을 저장할 경로 존재 여부 검증.
  const groupDir = path.join(process.cwd(), `${exportDir ? exportDir : 'export'}`);
  if (!fs.existsSync(groupDir)) {
    fs.mkdirSync(groupDir, { recursive: true });
  }

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity // 새 출 문자 감지 때까지 대기.
  });

  // 라인별로 파일 생성.
  const legalCodeList = lcj().filter(e => e.isAlive);
  rl.on('line', (line) => {
    try {
      const parsed = JSON.parse(line);
      parsed.properties.gid = lodash.padEnd(parsed.properties.gid, 10, '0');
      parsed.properties.gidInfo = legalCodeList.filter(e => e.fullCode === parsed.properties.gid)[0];
      fs.writeFile(path.join(groupDir, `${parsed.properties.gid}.json`), JSON.stringify(parsed, null, 0), (err) => {
        if (err) console.log(err);
      });

    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });

  // 파일 읽기 완료 시 처리
  rl.on('close', () => {
    console.log('File reading completed. JSON file writing may not have been done yet. Please check your export directory.');
  });
}

if (require.main === module) {
  if (process.argv.includes('-h') || process.argv.includes('--help')) {
    console.log('USAGE');
  } else {
    let [, , filePath, exportDir] = process.argv;
    splitGeoJson(filePath, exportDir);
  }
}

module.exports = { splitGeoJson, gjs: splitGeoJson };