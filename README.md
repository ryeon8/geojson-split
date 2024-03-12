# geojson-split
## SUMMARY
- 국토교통부에서 제공하는 국토통계 공시지가 좌표 목록을 gid(법정동 코드).json으로 분리하는 패키지입니다.
- geojson 추출 방법.
  - https://map.ngii.go.kr/ms/map/NlipMap.do?tabGb=statsMap 방문.
  - 국토통계지도 > 토지 탭 선택.
  - 공시지가 / 시도 전체 / 시군구 전체 / 항목(법정경계) 선택. (필요에 맞게 선택)
  - 다운로드된 SHP 파일을 QGIS를 이용해 geojson으로 변환.
- 추출된 파일을 npx gjs 호출 시 인자로 지정해 사용 가능. 사용 방법은 아래 참조.

## ENV
- node v20.11.1
- npm 10.4.0

## USAGE
```
npx gjs {필수: geojson 파일 경로} {선택: 분리된 파일을 저장할 파일 경로. 현재 커맨드 수행 중인 경로 하위에 생성됨. 미입력 시 cwd/export에 생성.}
# e.g.
# npx gjs ./geo.json export > ./export 경로에 gid.json 파일 목록 생성.
```
