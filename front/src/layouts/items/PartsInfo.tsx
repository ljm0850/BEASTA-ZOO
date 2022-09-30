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
  const partName = ["귀", "머리", "입"];

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
    <div>
      <Typography variant="h6">Body parts</Typography>
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        justifyContent="space-between"
        width="100%"
      >
        {nftParts.map((nftPart, idx) => {
          return (
            <Stack direction="row" alignItems="center">
              <img src={nftPart.url} style={{ width: "40%" }}></img>
              <Stack>
                <Typography>
                  {nftPart.name} {partName[idx]}
                </Typography>
                <Typography>{nftPart.tier} 티어</Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </div>
  );
};

export default PartsInfo;
