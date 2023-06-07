import React, { useEffect, useState } from "react";
import { Calendar, Popover, Button, Select, Divider } from "antd";
import { apiUrl } from "./URLs";
import { GetRequest } from "./Fetch";
import { Link } from "react-router-dom";
const dayjs = require('dayjs')
export default function EventCalendar() {
	const [events, setEvents] = useState([]);
	//const [value, setValue] = useState(() => moment('2017-01-25', ''));
  //const [selectedValue, setSelectedValue] = useState(() => moment('2017-01-25'));

	useEffect(() => {
		GetRequest(apiUrl.url+"/curriculum/getStudentEventsByCohort/2309MB_MT")
			.then(response => {
				console.log(response);
				setEvents(response)});
	},[])

	const onSelect = (date) => {
    console.log("Selected Date", date)
  };

	const getListData = (value) => {
		let listData = [];
		var inputDate = new Date(new Date(value).toDateString());
		events.forEach((event) => {
			var eventDate = new Date(new Date(event.eventDate).toDateString());
			if(inputDate.valueOf() === eventDate.valueOf()) {
				listData.push({
					name:  event.curriculumEventTemplate.name +  " | " 
						+ new Date(event.eventDate).toLocaleTimeString(), 
					text: event.curriculumEventTemplate.description,
					type: event.curriculumEventTemplate.curriculumEventType.name
				});
			}
		})
		return listData;
	}

	const dateCellRender = (value) => {
		
		const data = getListData(value);

				return (
					<ul style={{listStyle:'none'}}>
						{data.map((item) => (
							<li>
								<Popover
									content={item.text}
									title={item.name}	
									trigger={"click"}
								>
									<Button 
										size="small" 
										style={{
											fontSize:"10px",
											
											backgroundColor: item.type === "Lecture" ? 
												'purple'
											:
											item.type === "Quiz"? 
												'brown'
											:
											item.type === "Midterm"?
												'orange'
											:
											item.type === "Final"?
												'red'
											:
											item.type === "Practicum"?
												'blue'
											:
												'',
											color: item.type === "Lecture" ? 
												'orange'
											:
											item.type === "Quiz"? 
												'turquoise'
											:
											item.type === "Midterm"?
												'purple'
											:
											item.type === "Final"?
												'#9be59b'
											:
											item.type === "Practicum"?
												'orange'
											:
												''
										}}
									>
										{item.name}
									</Button>
								</Popover>
							</li>
						))}
					</ul>
				)
	}

	return (
		<>
		<h1>Calendar</h1>
		
			<Link to="/curriculumlist">Curriculum List</Link>
			<br />
		<div style={{float:'right'}}>
			<p><b>Cohorts</b></p>
			<Select
				style={{width: 300}}
				defaultValue="2309MB_MT"
				options={[
					{ value: "2309MB_MT", label: "2309MB_MT"},
					{ value: "2309BD_MT", label: "2309BD_MT"},
					{ value: "2309BD_BA", label: "2309BD_BA"},
					{ value: "2309MB_BA", label: "2309MB_BA"}
				]}
				onChange={(value) => {
					GetRequest(apiUrl.url+"/curriculum/getStudentEventsByCohort/"+value)
						.then(response => {
							console.log(response);
							setEvents(response)});
				}}
			>
			</Select>
		</div>
		<br /><br />
		<Divider type="horizontal"/>
		<Calendar
			onSelect={onSelect}  
			cellRender={(date) => {
				return dateCellRender(date);
			}}
			defaultValue={dayjs("2023-09-01")}
		/>
		</>
	);
}