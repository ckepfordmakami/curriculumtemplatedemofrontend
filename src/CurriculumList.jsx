import React, { useEffect, useState } from "react";
import { Layout, Collapse, Button, Divider } from "antd"
import { GetRequest } from "./Fetch";
import { Link } from "react-router-dom";
import './App.css';
import { apiUrl } from "./URLs";
const { Panel } = Collapse;

export default function CurriculumList() {
	const [isLoading, setIsLoading] = useState(false);
	const [curriculums, setCurriculums] = useState([]);
	const [cohorts, setCohorts] = useState([]);
	const [key, setKey] = useState("7tuiocv");
	//Initial Load
	useEffect(() => {
		setIsLoading(true);
		GetRequest(apiUrl.url+`/curriculum/GetCurriculums`).then(response => {
			setCurriculums(response.item1)
			setCohorts(response.item2)
		});
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
												{module.curriculumEvents.map(template => (
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
								<Collapse accordion>
									<Panel
										header="Cohorts"
									>
										{cohorts.map(cohort => (
											cohort.curriculumId === curriculum.id?
											<>
												<p>
													{cohort.cohort}<Divider type="vertical" /><Link>View Calendar</Link></p>
											</>
											:
											<></>
										))}
									</Panel>
								</Collapse>
							</Panel>
						</>
					))}
				</Collapse>
			</Layout>
		</>
	)
}