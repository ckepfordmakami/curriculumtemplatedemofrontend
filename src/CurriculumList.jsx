import React, { useEffect, useState } from "react";
import { Layout, Collapse, Button } from "antd"
import { GetRequest } from "./Fetch";
import { Link } from "react-router-dom";
import './App.css';
import { apiUrl } from "./URLs";
const { Panel } = Collapse;

export default function CurriculumList() {
	const [isLoading, setIsLoading] = useState(false);
	const [curriculums, setCurriculums] = useState([]);
	const [key, setKey] = useState("7tuiocv");
	//Initial Load
	useEffect(() => {
		setIsLoading(true);
		GetRequest(apiUrl.url+`/curriculum/GetCurriculums`).then(response => setCurriculums(response));
		console.log(curriculums)
		setIsLoading(false);
	}, [])
	return (
		<>
			<h1>Curriculum List</h1>
			<div >
				<Link  to="/calendar">Calendar</Link>
			</div>
			<br /><br />
			<Layout>
				<Collapse accordion
					size="large"	
				>
					
					{curriculums.map(curriculum => (
						<>
							
							<Panel
								header={curriculum.name}
								key={curriculum.id}
							>
								{curriculum.sections.map(module => (
									<Collapse accordion
									>
										<Panel
											key={module.id}
											header={module.name}
										>
											<Collapse accordion
												size="small"
											>
												{module.curriculumEventTemplates.map(template => (
													<Panel
														key={template.id}
														header={template.name}
													>
														<p>{template.description}</p>
													</Panel>
												))}
											</Collapse>
										</Panel>
									</Collapse>
								))}
							</Panel>
						</>
					))}
				</Collapse>
			</Layout>
		</>
	)
}