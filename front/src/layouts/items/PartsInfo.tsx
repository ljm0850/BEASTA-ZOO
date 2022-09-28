// static files
import ears1 from "../../image/parts/ears/1.svg";
import ears2 from "../../image/parts/ears/2.svg";
import ears3 from "../../image/parts/ears/3.svg";
import ears4 from "../../image/parts/ears/4.svg";
import ears5 from "../../image/parts/ears/5.svg";
import ears6 from "../../image/parts/ears/6.svg";
import ears7 from "../../image/parts/ears/7.svg";
import ears8 from "../../image/parts/ears/8.svg";
import ears9 from "../../image/parts/ears/9.svg";
import head1 from "../../image/parts/head/1.svg";
import head2 from "../../image/parts/head/2.svg";
import head3 from "../../image/parts/head/3.svg";
import head4 from "../../image/parts/head/4.svg";
import head5 from "../../image/parts/head/5.svg";
import head6 from "../../image/parts/head/6.svg";
import head7 from "../../image/parts/head/7.svg";
import head8 from "../../image/parts/head/8.svg";
import head9 from "../../image/parts/head/9.svg";
import mouth1 from "../../image/parts/mouth/1.svg";
import mouth2 from "../../image/parts/mouth/2.svg";
import mouth3 from "../../image/parts/mouth/3.svg";
import mouth4 from "../../image/parts/mouth/4.svg";
import mouth5 from "../../image/parts/mouth/5.svg";
import mouth6 from "../../image/parts/mouth/6.svg";
import mouth7 from "../../image/parts/mouth/7.svg";
import mouth8 from "../../image/parts/mouth/8.svg";
import mouth9 from "../../image/parts/mouth/9.svg";

import styled from "@emotion/styled";
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
  const parts = ["귀", "머리", "입"];

  const earsImages = [
    ears1,
    ears2,
    ears3,
    ears4,
    ears5,
    ears6,
    ears7,
    ears8,
    ears9,
  ];
  const headImages = [
    head1,
    head2,
    head3,
    head4,
    head5,
    head6,
    head7,
    head8,
    head9,
  ];
  const mouthImages = [
    mouth1,
    mouth2,
    mouth3,
    mouth4,
    mouth5,
    mouth6,
    mouth7,
    mouth8,
    mouth9,
  ];
  const partsImages = [earsImages, headImages, mouthImages];

  useEffect(() => {
    const partList: AnimalParts[] = [];
    parts.map((part, idx) => {
      const partInfo = FetchAnimal(Number(javCode[idx]));
      partList.push({
        name: partInfo.name + " " + part,
        url: partsImages[idx][Number(javCode[idx])],
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
        {nftParts.map((nftPart) => {
          return (
            <Stack direction="row" alignItems="center">
              <img src={nftPart.url} style={{ maxWidth: "100px" }}></img>
              <Stack>
                <Typography>{nftPart.name}</Typography>
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
