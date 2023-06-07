import React, { useEffect, useState } from "react";
import { Calendar, Popover, Button, Select, Divider } from "antd";
import { apiUrl } from "./URLs";
import { GetRequest } from "./Fetch";
import { Link } from "react-router-dom";
import moment from 'moment';
export default function EventCalendar() {
	const [events, setEvents] = useState([]);
	//const [value, setValue] = useState(() => moment('2017-01-25', ''));
  //const [selectedValue, setSelectedValue] = useState(() => moment('2017-01-25'));

	useEffect(() => {
		GetRequest(apiUrl.url+"/curriculum/getAllCurriculumEventTemplates")
			.then(response => setEvents(response));
	},[])

	const onSelect = (date) => {
    console.log("Selected Date", date)
  };

	const getListData = (value) => {
		let listData = [];
		var inputDate = new Date(new Date(value).toDateString());
		events.forEach((event) => {
			var eventDate = new Date(new Date(event.date).toDateString());
			if(inputDate.valueOf() === eventDate.valueOf()) {
				listData.push({name:  event.name +  " | " + new Date(event.date).toLocaleTimeString(), text: event.description});
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
											color: item.name.includes("Appendicular")? 'turquoise'
											: 
												item.name.includes("practice") || item.name.includes("Sciatica")? 'orange' : '',
											backgroundColor: item.name.includes("Appendicular")? 
												'brown'
											:
											item.name.includes("practice") || item.name.includes("Sciatica")? 
												'purple'
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
			<Select
				style={{width: 300}}
				options={[
					{ value: "Advanced Clinical Massage Therapy", label: "Advanced Clinical Massage Therapy"},
					{ value: "Business Admin", label: "Business Admin"}
				]}
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
		/>
		</>
	);
}