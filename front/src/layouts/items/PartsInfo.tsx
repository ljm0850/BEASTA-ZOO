import { Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import FetchAnimal from "../../utils/FetchAnimal";

interface Props {
  javCode: string;
}

interface AnimalParts {
  name: string;
  url: string;
  tier: number;
}

const PartsInfo = ({ javCode }: Props) => {
  const [nftParts, setNftParts] = useState<AnimalParts[]>([]);
  const partName = ["머리", "귀", "입"];

  useEffect(() => {
    const partList: AnimalParts[] = [];
    const parts = ["head", "ears", "mouth"];
    parts.map((part, idx) => {
      const partInfo = FetchAnimal(Number(javCode[idx]));
      partList.push({
        name: partInfo.name,
        url: require(`../../image/parts/${part}/${javCode[idx]}.svg`),
        tier: partInfo.tier,
      });
    });
    setNftParts(partList);
  }, [javCode]);

  return (
    <Stack
      direction="row"
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
      justifyContent="space-between"
      width="100%"
    >
      {nftParts.map((nftPart, idx) => {
        return (
          <Stack direction="row" alignItems="center" key={partName[idx]}>
            <img src={nftPart.url} style={{ width: "40%" }}></img>
            <div>
              <div>
                {nftPart.name} {partName[idx]}
              </div>
              <div>{nftPart.tier} 티어</div>
            </div>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default PartsInfo;
