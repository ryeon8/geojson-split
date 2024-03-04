# geojson-split
- 국토교통부에서 제공하는 국토통계 공시지가 리경계 좌표 목록을 리 단위 json으로 분리하는 패키지입니다.

## ENV
- node v20.11.1
- npm 10.4.0

## USAGE
```
npx gjs {필수: geojson 파일 경로} {선택: 분리된 파일을 저장할 파일 경로. 현재 커맨드 수행 중인 경로 하위에 생성됨. 미입력 시 cwd/export에 생성.}
# e.g.
# npx gjs ./geo.json export > ./export 경로에 gid.json 파일 목록 생성.
```