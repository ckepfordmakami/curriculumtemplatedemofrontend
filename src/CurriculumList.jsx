import React, { useEffect, useState } from "react";
import { Layout, Collapse, Button, Divider, List } from "antd"
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
											<List
												itemLayout="horizontal"
												dataSource={module.curriculumEvents}
												renderItem={(event) => (
													<List.Item
														key={event.id}
													>
														<List.Item.Meta 
															title={event.name}
															description={event.description}
														/>
													</List.Item>
												)}
											>

											</List>
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
													{cohort.cohort}<Divider type="vertical" /><Link to ={"/calendar/"+cohort.cohort}>View Calendar</Link></p>
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