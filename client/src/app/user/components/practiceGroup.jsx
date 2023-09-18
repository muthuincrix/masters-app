import { FormControlLabel, Checkbox } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";


export default function PracticeGroup({
  topic,
  setSelectGoal,
  index,
  isSelect,
  type,
  MD,
  selectGoal,
  ListTopic,
}) {
useEffect(()=>{
  
 
},[])

const checkIsSelect = ()=>{
    const isSelect =[]
    selectGoal.topic[index].ListTopic.map(task => {
        if(task.isSelect == true) isSelect.push(task)
    })
console.log(selectGoal.topic[index].ListTopic.length , isSelect.length);
if(selectGoal.topic[index].ListTopic.length == isSelect.length) { 
    setSelectGoal((PreValue) => {
        const getValue = { ...PreValue };
        getValue.topic[index].isSelect = true
        return getValue;
      })
}
else
{
    setSelectGoal((PreValue) => {
        const getValue = { ...PreValue };
        getValue.topic[index].isSelect = false
        return getValue;
      })
}
}

  return (
    <div style={{ width: "400px" ,"&:hover":{background:'red'} }} key={index}>
      <Accordion     elevation={MD ? 0 : 1} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{borderRadius:'10px'}} >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                maxWidth: "calc(100% - 140px)",
                fontWeight: "500",
               
              }}
            >
                  <FormControlLabel
                control={
                  <Checkbox
                    checked={isSelect }
                    sx={{
                      "&.Mui-checked": {
                        color: "#187163",
                      },
                      "&.MuiCheckbox-root": {
                        color: "#187163",
                      },
                    }}
                    onChange={(e, value) => {
                      MD == undefined
                        ? setSelectGoal((PreValue) => {
                            const getValue = { ...PreValue };
                            getValue.topic[index].isSelect = value;
                            getValue.topic[index].ListTopic.map(task => task.isSelect = value)
                            return getValue;
                          })
                        : setSelectGoal((PreValue) => {
                            const getValue = { ...PreValue };
                            getValue.topic[index].isSelect = value;
                            getValue.topic[index].ListTopic.map(task => task.isSelect = value)
                            return getValue;
                          });
                    }}
                  />
                }
                label={topic}
              />
              
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "10px",
            margin: "0",
          }}
        >
          {ListTopic.map((task,listIndex) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSelect == true || task.isSelect == true ? true : false}
                    sx={{
                      "&.Mui-checked": {
                        color: "#187163",
                      },
                      "&.MuiCheckbox-root": {
                        color: "#187163",
                      },
                    }}
                    onChange={(e, value) => {
                      MD == undefined
                        ? setSelectGoal((PreValue) => {
                            console.log(PreValue);
                            const getValue = { ...PreValue };
                           getValue.topic[index].ListTopic[listIndex].isSelect = value
                           checkIsSelect()
                            return getValue;
                          })
                        : setSelectGoal((PreValue) => {
                            
                            const getValue ={ ...PreValue };
                            getValue.topic[index].ListTopic[listIndex].isSelect = value
                            checkIsSelect()
                            return getValue;
                          });
                    }}
                  />
                }
                label={task.title}
              />
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}