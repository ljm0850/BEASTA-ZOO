//static files
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

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Grid } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ImageFilter {
  id: number;
  title: string;
  images: string[];
}

declare global {
  interface String {
    changeIndex(index: number, replacement: number): string;
  }
}

String.prototype.changeIndex = function (
  this: string,
  index: number,
  replacement: number
) {
  if (index >= this.length) {
    return this.valueOf();
  }
  return (
    this.substring(0, index) + String(replacement) + this.substring(index + 1)
  );
};

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const ItemFilterContainer = ({ search, setSearch }: Props) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const filters: ImageFilter[] = [
    {
      id: 1,
      title: "머리",
      images: [head1, head2, head3, head4, head5, head6, head7, head8, head9],
    },
    {
      id: 2,
      title: "귀",
      images: [ears1, ears2, ears3, ears4, ears5, ears6, ears7, ears8, ears9],
    },
    {
      id: 3,
      title: "입",
      images: [
        mouth1,
        mouth2,
        mouth3,
        mouth4,
        mouth5,
        mouth6,
        mouth7,
        mouth8,
        mouth9,
      ],
    },
    // {
    //   id: 4,
    //   title: '눈',
    //   images: [head1, head2, head3, head4, head5, head6, head7, head8, head9],
    // },
    // {
    //   id: 5,
    //   title: '몸',
    //   images: [head1, head2, head3, head4, head5, head6, head7, head8, head9],
    // },
    // {
    //   id: 6,
    //   title: '액세서리',
    //   images: [head1, head2, head3, head4, head5, head6, head7, head8, head9],
    // },
    // {
    //   id: 7,
    //   title: '배경',
    //   images: [head1, head2, head3, head4, head5, head6, head7, head8, head9],
    // },
  ];
  const selectFilter = (index: number, choice: number) => {
    if (Number(search[index]) !== choice) {
      setSearch(search.changeIndex(index, choice));
    } else {
      setSearch(search.changeIndex(index, 0));
    }
  };

  const clearFilter = () => {
    setSearch("0000000");
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {filters.map((filter: ImageFilter, index: number) => {
        return (
          <Accordion
            expanded={expanded === String(filter.id)}
            onChange={handleChange(String(filter.id))}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {filter.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {filter.images.map((image, imgNum) => {
                  return (
                    <Grid item xs={4} sm={6} md={4}>
                      <Button
                        {...(Number(search[index]) === imgNum + 1
                          ? { variant: "outlined" }
                          : "")}
                        onClick={() => selectFilter(index, imgNum + 1)}
                      >
                        <img
                          style={{ maxWidth: "100%", height: "auto" }}
                          src={image}
                          alt={image}
                        ></img>
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Button
        onClick={() => clearFilter()}
        size="large"
        variant="contained"
        color="warning"
      >
        초기화
      </Button>
      <p>{search}</p>
    </div>
  );
};

export default ItemFilterContainer;
