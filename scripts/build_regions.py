"""시도 17개 데이터 생성. data/regions.json은 산출물이다. (스펙 §4)"""
import json
import pathlib

SIDOS = [
    ("seoul", "서울특별시"), ("busan", "부산광역시"), ("daegu", "대구광역시"),
    ("incheon", "인천광역시"), ("gwangju", "광주광역시"), ("daejeon", "대전광역시"),
    ("ulsan", "울산광역시"), ("sejong", "세종특별자치시"), ("gyeonggi", "경기도"),
    ("gangwon", "강원특별자치도"), ("chungbuk", "충청북도"), ("chungnam", "충청남도"),
    ("jeonbuk", "전북특별자치도"), ("jeonnam", "전라남도"), ("gyeongbuk", "경상북도"),
    ("gyeongnam", "경상남도"), ("jeju", "제주특별자치도"),
]


def main() -> None:
    data = [{"slug": s, "name": n} for s, n in SIDOS]
    out = pathlib.Path(__file__).resolve().parent.parent / "data" / "regions.json"
    out.parent.mkdir(exist_ok=True)
    out.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {len(data)} sidos -> {out}")


if __name__ == "__main__":
    main()
