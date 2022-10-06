import { Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import FetchAnimal from "../../utils/FetchAnimal";
import styles from "./PartsTier.module.scss";

interface Props {
  javCode: string;
}

interface AnimalParts {
  name: string;
  url: string;
  tier: number;
}

const PartsTier = ({ javCode }: Props) => {
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
      divider={<Divider orientation="vertical" flexItem />}
      justifyContent="space-between"
      width="100%"
    >
      {nftParts.map((nftPart, idx) => {
        return (
          <div key={partName[idx]} style={{ fontWeight: "800" }}>
            <Stack direction="row" alignItems="center" fontSize="0.5em">
              <img src={nftPart.url} style={{ width: "50%" }}></img>
              <div>
                <div>{nftPart.name}</div>
                <div>
                  {nftPart.tier === 1 && <div>{nftPart.tier} 티어</div>}
                </div>
                <div>
                  {nftPart.tier === 2 && (
                    <div style={{ color: "#38E54D" }}>{nftPart.tier} 티어</div>
                  )}
                </div>
                <div>
                  {nftPart.tier === 3 && (
                    <div className={styles.tierAnimation}>
                      {nftPart.tier} 티어
                    </div>
                  )}
                </div>
              </div>
            </Stack>
          </div>
        );
      })}
    </Stack>
  );
};

export default PartsTier;
