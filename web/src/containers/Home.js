import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actions from 'actions'

class Home extends Component {
	render(){
		return (
			<div className="has-text-centered">
				<div className="heading">
					<h1 className="title">
						<strong><a>ITimer</a></strong>
					</h1>
			        <h2 className="subtitle">
						Data Collection and Analysis System for Running
			        </h2>
				</div>
				<hr />
				<div className='content is-medium'>
					<p className="has-text-left">
						&emsp;&emsp;&emsp;<a>ITimer</a> หรือ <a>Data Collection and Analysis System for Running</a> คือ ระบบสำหรับทดสอบสมรรถภาพทางการวิ่งโดยการตรวจจับการวิ่งผ่านในแต่ละเสาด้วยเลเซอร์ และแสดงผลผ่านทาง Web Application และ Mobile Application โดยอาศัยแนวคิดเกี่ยวกับ Internet of Things และ Wireless Sensor Networks มาประยุกต์ใช้ในการพัฒนาระบบ เพื่อใช้ในการทดสอบสมรรถภาพทางการวิ่งของนิสิตและนักกีฬาของมหาวิทยาลัยเกษตรศาตร์จำนวนกว่า 3000 คนต่อภาคเรียนการศึกษา ซึ่งระบบที่ถูกพัฒนาขึ้นจะมีราคาของอุปกรณ์ต่อหน่วยที่ต่ำกว่าระบบอื่นๆที่ผลิตขายอยู่ทั่วไป และมีฟีเจอร์การทำงานหลักๆ ดังต่อไปนี้
					</p>
					<br />
					<div className="columns">
					  <div className="column">
					  <div className="card">
					  <header class="card-header">
						 <p className="card-header-title " style={{ "justifyContent": "center", 'alignItems': 'center' }} >
							<a>Competition</a>
						</p>
						</header>
						<div className="card-content">
						<div className="has-text-left">
							&emsp;&emsp;&emsp;เป็นฟีเจอร์สำหรับเปรียบเทียบเวลาในการวิ่งของผู้ใช้งานระบบ โดยจะทำการจัด Ranking ตามเวลาในการวิ่งของผู้ใข้งานระบบ
						</div>
						</div>
						</div>
					  </div>
					  <div className="column">
					  <div className="card">
					  <header class="card-header">
						 <p className="card-header-title " style={{ "justifyContent": "center", 'alignItems': 'center' }} >
							<a>Timer</a>
						</p>
						</header>
						<div className="card-content">
						<div className="has-text-left">
							&emsp;&emsp;&emsp;เป็นฟีเจอร์สำหรับการจับเวลาในการวิ่ง ซึ่งจะแสดงผลลัพธ์ของเวลาและความเร็วที่ใช้ในการทดสอบในแต่ละช่วง
						</div>
						</div>
						</div>
					  </div>
					  <div className="column">
					  <div className="card">
					  <header class="card-header">
						 <p className="card-header-title " style={{ "justifyContent": "center", 'alignItems': 'center' }} >
							<a>History</a>
						</p>
						</header>
						<div className="card-content">
						<div className="has-text-left">
							&emsp;&emsp;&emsp;ผู้ใช้งานสามารถดูผลลัพธ์จากการทดสอบสมรรถภาพทางการวิ่งย้อนหลังได้ผ่านทางฟีเจอร์นี้ ซึ่งระบบจะแสดงผลลัพธ์การทดสอบในรูปแบบรายการและแบบกราฟ
						</div>
						</div>
						</div>
					  </div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
