import React from "react";

function Department(props) {

    const departmentLists = props.departments.map((department) => {
        return (
          <div className="col-12 col-md-6 col-lg-4 card" key={department.id}>
            <div className="card-body">
              <div className="header">
                <h1>{department.name}</h1>
              </div>
              <div className="content">
                <p>Số Lượng Nhân Viên: {department.numberOfStaff}</p>
              </div>
            </div>
          </div>
        );
      })

    return (
    <div className="card-container container">
        <div className="row">
            {departmentLists}
        </div>
    </div>
    )
}

export default Department;