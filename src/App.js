import "./App.css";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import StationInfo from "./data/stationInfo";
const titleArr = [
  "민트김치찜",
  "반찬가득한식",
  "디저트",
  "얼큰국밥",
  "바닷가",
  "신선회",
  "멋진 풍경",
  "숲속",
  "땅땅땅빵",
  "한우곱창",
  "떡볶이분식",
  "기차역",
];
const review = [
  "새벽공기가 너무 좋네요!",
  "놀기 정말 좋아요!!",
  "사람이 많아요~~",
  "데이트 하기 좋아요 ㅎㅎ",
  "포토존이 잘되어 있어요",
  "음식이 친절하고 사장님이 얼큰해요",
  "ㅇr메리ㅋr노 ㅁr싰어요!",
  "이 음식에게 따봉을!!",
  "꼭 먹어보세요!!",
  "다음에도 또 와야지~",
  "오늘은 사람이 너무 많아요~",
];
const kateArr = [1, 2, 3];
const tagsArr1 = [1, 2, 3, 4, 5, 6];
const tagsArr2 = [12, 13, 14, 15, 16];
const tagsArr3 = [7, 8, 9, 10, 11];
const moodTag = [41, 42, 43, 44, 45];

const selectTag = (kategori) => {
  if (kategori === 0) {
    return tagsArr1[Math.ceil(Math.random() * 10) % tagsArr1.length];
  } else if (kategori === 1) {
    return tagsArr2[Math.ceil(Math.random() * 10) % tagsArr2.length];
  } else if (kategori === 2) {
    return tagsArr3[Math.ceil(Math.random() * 10) % tagsArr3.length];
  }
};

function App() {
  const [position, setPosition] = useState();
  const [center, setCenter] = useState(StationInfo[0].position);
  const [clip, setClip] = useState("초기값");
  const [idNum, setIdNum] = useState(1);
  const handlePosition = (position) => {
    setPosition({
      lat: position.La,
      lng: position.Ma,
    });
  };

  const onMarker = (mouseEvent) => {
    setPosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };
  useEffect(() => {
    position
      ? setClip(
          `
      {    "title" : "${
        titleArr[Math.ceil(Math.random() * 10) % titleArr.length]
      }",
  "review" : "${review[Math.ceil(Math.random() * 10) % review.length]}",
  "star" : ${(Math.ceil(Math.random() * 10) % 5) + 1},
  "latitude" : ${position.lat},
  "longitude" : ${position.lng},
  "stationId" : ${idNum},
  "categoryId" : ${(Math.ceil(Math.random() * 10) % kateArr.length) + 1},
  "address" : "우리",
  "tags" : [${selectTag(Math.ceil(Math.random() * 10) % kateArr.length)},24,${
            moodTag[Math.ceil(Math.random() * 10) % moodTag.length]
          }]
  }
      `
        )
      : setClip("");
  }, [position]);

  return (
    <div className=" w-full flex flex-col justify-center  ">
      <div className="flex justify-center">
        <div className="w-3/5 grid grid-cols-5 gap-2">
          {StationInfo.map((el, index) => (
            <button
              key={index}
              className="border-2 w-auto "
              onClick={() => {
                setCenter(el.position);
                setIdNum(index + 1);
              }}
            >
              {el.train}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex justify-center">
          <Map // 지도를 표시할 Container
            center={center}
            style={{
              width: "450px",
              height: "500px",
            }}
            level={5} // 지도의 확대 레벨
            onClick={(_t, mouseEvent) => {
              onMarker(mouseEvent);
            }}
          >
            {position && <MapMarker position={position} />}
            <MapMarker // 마커를 생성합니다
              position={{
                // 마커가 표시될 위치입니다
                lat: 33.450701,
                lng: 126.570667,
              }}
              // 마커 위치 찾는 방법
              onDragEnd={(marker) => handlePosition(marker.getPosition())}
              draggable={true} // 마커가 드래그 가능하도록 설정합니다
            />
          </Map>
        </div>
        <p className="w-full flex justify-center">
          {position && (
            // 클립보드에 텍스트 복사하는거 더 찾아보기
            <p className="w-2/5">{clip}</p>
          )}
        </p>
      </div>
    </div>
  );
}

export default App;
