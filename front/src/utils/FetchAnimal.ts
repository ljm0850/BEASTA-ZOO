// 파츠 별 동물 이름 및 티어 조회
const FetchAnimal = (code: number) => {
  const animal = [
    { name: "", tier: 0 },
    { name: "사슴", tier: 1 },
    { name: "고양이", tier: 1 },
    { name: "닭", tier: 1 },
    { name: "양", tier: 2 },
    { name: "돼지", tier: 2 },
    { name: "새", tier: 2 },
    { name: "용", tier: 3 },
    { name: "토끼", tier: 3 },
    { name: "호랑이", tier: 3 },
  ];
  return animal[code];
};

export default FetchAnimal;
