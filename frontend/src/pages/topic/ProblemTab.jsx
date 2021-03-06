import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Solution from "./Solution";
import Problem from "./Problem";
import axios from "axios";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Submission from "./Submission";


const ProblemTab = () => {
    const [value, setValue] = useState('problem');
    const [problem, setProblem] = useState({
        _id: "",
        topicId: "",
        title: "",
        problemStatement: "",
        problemSampleInput: "",
        problemSampleOutput: "",
        constraints: "",
        solutions: "",
    });
    const {id} = useParams();
    const {title, _id, topicId, problemStatement, problemSampleInput, problemSampleOutput, constraints, solutions} = problem;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //api/ problem/all/:id
    //Fetching all problems
    useEffect(() => {
        const fetchProblems = async () => {
            const {data} = await axios.get(`/api/problem/${id}`);
            setProblem(data);
        }
        fetchProblems();
    }, [])

    return (
        <>
            <div className='content-margin'>
                <Box sx={{backgroundColor: 'inherit'}}>
                    <Tabs

                        sx={{mx: 40}}
                        value={value}
                        onChange={handleChange}
                        aria-label="wrapped label tabs example"
                        variant="fullWidth"
                        textColor="secondary"
                    >
                        <Tab
                            value="problem"
                            label="problem"
                        />
                        <Tab value="code-run" label="Submit code"/>
                        <Tab value="solution" label="solution"/>
                    </Tabs>

                    {value === 'problem' && problem && <Problem
                        title={title}
                        problemStatement={problemStatement}
                        problemSampleInput={problemSampleInput}
                        problemSampleOutput={problemSampleOutput}
                        constraints={constraints}
                    />}
                    {value === 'code-run' && <Submission />}
                    {value === 'solution' && <Solution solutions={solutions}/>}
                </Box>
            </div>

        </>
    );
}
export default ProblemTab;
