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
import eyes1 from "../../image/parts/eyes/1.svg";
import eyes2 from "../../image/parts/eyes/2.svg";
import eyes3 from "../../image/parts/eyes/3.svg";
import eyes4 from "../../image/parts/eyes/4.svg";
import eyes5 from "../../image/parts/eyes/5.svg";
import eyes6 from "../../image/parts/eyes/6.svg";
import eyes7 from "../../image/parts/eyes/7.svg";
import eyes8 from "../../image/parts/eyes/8.svg";
import eyes9 from "../../image/parts/eyes/9.svg";
import eyes10 from "../../image/parts/eyes/10.svg";
import eyes11 from "../../image/parts/eyes/11.svg";
import eyes12 from "../../image/parts/eyes/12.svg";
import eyes13 from "../../image/parts/eyes/13.svg";
import eyes14 from "../../image/parts/eyes/14.svg";
import eyes15 from "../../image/parts/eyes/15.svg";
import body1 from "../../image/parts/body/1.svg";
import body2 from "../../image/parts/body/2.svg";
import body3 from "../../image/parts/body/3.svg";
import body4 from "../../image/parts/body/4.svg";
import body5 from "../../image/parts/body/5.svg";
import body6 from "../../image/parts/body/6.svg";
import body7 from "../../image/parts/body/7.svg";
import body8 from "../../image/parts/body/8.svg";
import body9 from "../../image/parts/body/9.svg";
import body10 from "../../image/parts/body/10.svg";
import body11 from "../../image/parts/body/11.svg";
import body12 from "../../image/parts/body/12.svg";
import acc1 from "../../image/parts/acc/1.svg";
import acc2 from "../../image/parts/acc/2.svg";
import acc3 from "../../image/parts/acc/3.svg";
import acc4 from "../../image/parts/acc/4.svg";
import acc5 from "../../image/parts/acc/5.svg";
import acc6 from "../../image/parts/acc/6.svg";
import acc7 from "../../image/parts/acc/7.svg";
import acc8 from "../../image/parts/acc/8.svg";
import acc9 from "../../image/parts/acc/9.svg";
import back1 from "../../image/parts/back/1.svg";
import back2 from "../../image/parts/back/2.svg";
import back3 from "../../image/parts/back/3.svg";
import back4 from "../../image/parts/back/4.svg";
import back5 from "../../image/parts/back/5.svg";
import back6 from "../../image/parts/back/6.svg";
import back7 from "../../image/parts/back/7.svg";
import back8 from "../../image/parts/back/8.svg";
import back9 from "../../image/parts/back/9.svg";
import back10 from "../../image/parts/back/10.svg";
import back11 from "../../image/parts/back/11.svg";
import back12 from "../../image/parts/back/12.svg";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import FetchAnimal from "../../utils/FetchAnimal";

interface Parts {
  id: number;
  title: string;
  images: string[];
}

declare global {
  interface String {
    changeIndex(index: number, replacement: string): string;
  }
}

String.prototype.changeIndex = function (
  this: string,
  index: number,
  replacement: string
) {
  if (index >= this.length) {
    return this.valueOf();
  }
  return this.substring(0, index) + replacement + this.substring(index + 1);
};

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  haveCompleted: number;
  setHaveCompleted: Dispatch<SetStateAction<number>>;
  sort: number;
  setSort: Dispatch<SetStateAction<number>>;
}

const ItemFilterContainer = ({
  search,
  setSearch,
  haveCompleted,
  setHaveCompleted,
  setSort,
}: Props) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const filters: Parts[] = [
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
    {
      id: 4,
      title: "눈",
      images: [
        eyes1,
        eyes2,
        eyes3,
        eyes4,
        eyes5,
        eyes6,
        eyes7,
        eyes8,
        eyes9,
        eyes10,
        eyes11,
        eyes12,
        eyes13,
        eyes14,
        eyes15,
      ],
    },
    {
      id: 5,
      title: "몸",
      images: [
        body1,
        body2,
        body3,
        body4,
        body5,
        body6,
        body7,
        body8,
        body9,
        body10,
        body11,
        body12,
      ],
    },
    {
      id: 6,
      title: "액세서리",
      images: [acc1, acc2, acc3, acc4, acc5, acc6, acc7, acc8, acc9],
    },
    {
      id: 7,
      title: "배경",
      images: [
        back1,
        back2,
        back3,
        back4,
        back5,
        back6,
        back7,
        back8,
        back9,
        back10,
        back11,
        back12,
      ],
    },
  ];
  const selectFilter = (index: number, choice: number) => {
    if (parseInt(search[index], 16) !== choice) {
      setSearch(search.changeIndex(index, choice.toString(16)));
    } else {
      setSearch(search.changeIndex(index, "0"));
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
      {filters.map((filter: Parts, index: number) => {
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

              {parseInt(search[filter.id - 1], 16) >= 1 && (
                <img
                  src={filter.images[parseInt(search[filter.id - 1], 16) - 1]}
                  alt="img"
                  style={{ maxWidth: "20%", height: "auto" }}
                />
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {filter.images.map((image, imgNum) => {
                  return (
                    <Grid item xs={4} sm={6} md={4}>
                      <Button
                        {...(parseInt(search[index], 16) === imgNum + 1
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
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onClick={() => setHaveCompleted(1 - haveCompleted)}
              checked={!!haveCompleted}
            />
          }
          label="판매완료NFT"
        />
      </FormGroup>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">정렬</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="recent"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="recent"
            control={<Radio />}
            label="최신순"
            onClick={() => setSort(0)}
          />
          <FormControlLabel
            value="priceLow"
            control={<Radio />}
            label="가격낮은순"
            onClick={() => setSort(1)}
          />
          <FormControlLabel
            value="priceHigh"
            control={<Radio />}
            label="가격높은순"
            onClick={() => setSort(2)}
          />
        </RadioGroup>
      </FormControl>
      <p>{search}</p>
    </div>
  );
};

export default ItemFilterContainer;
