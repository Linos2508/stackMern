import React, { useEffect, useState, useMemo } from "react";
import PureModal from "react-pure-modal";
import DataTable from "react-data-table-component";
import {inArray, getBaseApi, dateFormat} from "../common/functions";
import Header from "../components/Header.jsx";
import RemoveIcon from "../assets/images/remove-gold.svg";
import CloseIcon from "../assets/images/close.svg";
import "../styles/Exercises.scss";
import swal from "sweetalert";

export default function Exercises(props) {
    const [filterText, setFilterText] = useState("");
    const [method, setMethod] = useState("POST");
    const [Exercise, setExercise] = useState({});
    const [data,setData] = useState([]);
    const [addModal, setAddModal] = useState(false);
    
    const columns = [
        {
            name: "ID Exercise",
            selector: "_id",
            sortable: true,
        },
        {
            name: "User Name",
            selector: "username",
            sortable: true,
        },
        {
            name: "Description",
            selector: "description",
            sortable: true,
        },
        {
            name: "Duration",
            selector: "duration",
            sortable: true,
        },
        {
            name: "Date",
            selector: "date",
            sortable: true,
        },
        {
            name: "Created At",
            selector: "createdAt",
            sortable: true,
        },
        {
            name: "Updated At",
            selector: "updatedAt",
            sortable: true,
        },
        {
            name: "Remove",
            cell: (row) => (
              <button onClick = {() => deleteExercise(row._id)}>
                <img src={RemoveIcon} alt="Remove" />
              </button>
            ),
        },
        {
            name: "Edit",
            cell: (row) => (
                <button onClick={() => getExerciseById(row._id)}>
                <img src={RemoveIcon} alt="Remove" />
                </button>
            ),
        },
      ];
    const filteredItems = data.filter((item) => {
        let a = Object.keys(item).map((element) => {
          if (
            item[element] &&
            item[element]
              .toString()
              .toLowerCase()
              .includes(filterText.toLowerCase())
          ) {
            return true;
          }
          return false;
        });
        if (inArray(true, a)) {
          return true;
        }
        return false;
      });
    const FilterComponent = ({ onFilter }) => (
        <article className="filterTable">
            <span>
                <button onClick={() => setAddModal(true)}>
                    Insert User
                </button>
            </span>
            <span>
                <input
                id="search"
                type="text"
                placeholder="Search"
                aria-label="Search Input"
                onChange={onFilter}
                className="searchFilter"
                />
            </span>
        </article>
      );
    const subHeaderComponentMemo = useMemo(() => {
        return <FilterComponent onFilter={(e) => setFilterText(e.target.value)} />;
    }, []);
    useEffect(() => {
        getExercises();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const getExercises = () =>{
        fetch(getBaseApi() + "/exercises/")
        .then(res => res.json())
        .then(response => {
            if (response.result){
                setData(response.data);
            }else{
                swal({title: "Error", icon: "error", text:response.error.name})
            }
        }).catch((error) => swal({title: "Error", icon: "error", text:error.message}))
    }
    const onSubmitExercise = (e) => {
        e.preventDefault();
        let data = {
            "username": e.target[0].value,
            "description": e.target[1].value,
            "duration": e.target[2].value,
            "date": e.target[3].value
        }
        let url = method === "POST" ? "/exercises/add" : method === "PUT" ? "/exercises/"+ Exercise._id :"";
        fetch(getBaseApi() + url,{
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            }
        }).then(res => res.json())
        .then(response => {
          if (response.result){
            swal({title: "Success", icon: "success", text:"Change was made correctly"})
            setAddModal(false);
            getExercises();
          }
          else{
            setAddModal(false);
            swal({title: "Error", icon: "error", text:response.error.name})
          }
        }).catch((error) => {
          setAddModal(false);
          swal({title: "Error", icon: "error", text:error.message})
        })
    }
    const getExerciseById = (id) => {
        fetch(getBaseApi() + "/exercises/"+id)
        .then(res => res.json())
        .then(response => {
            if (response.result && response.data !== undefined){
                response.data.date = dateFormat(3,new Date(Date.parse(response.data.date)));
                setExercise(response.data);
                setMethod("PUT");
                setAddModal(true);
            }else{
                swal({title: "Error", icon: "error", text:response.error.name})
            }
        }).catch((error) => swal({title: "Error", icon: "error", text:error.message}))
    }
    const deleteExercise = (id) => {
        fetch(getBaseApi() + "/exercises/"+id,{
            method: "DELETE"
        }).then(res => res.json())
        .then(response => {
          if (response.result){
            swal({title: "Success", icon: "success", text:"Change was made correctly"})
            getExercises();
          }
          else{
            swal({title: "Error", icon: "error", text:response.error.name})
          }
        }).catch((error) => swal({title: "Error", icon: "error", text:error.message}))
    }
    return(
        <>
            <Header active="exercises"/>
            <section className="container">
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                />
            </section>
            <PureModal
                isOpen={addModal}
                onClose={() => setAddModal(false)}
                className="smallModal"
                closeButton={
                    <button>
                        <img src={CloseIcon} alt="Close" />
                    </button>
                }
            >
                <h2>Exercise Information</h2>
                <form className="addClientsModal" onSubmit={e => onSubmitExercise(e)}>
                    <div className="generalInfo">
                        <article>
                            <label htmlFor="userName">User Name</label>
                            <input type="text" defaultValue={Exercise.username} id="userName" name="userName"></input>
                        </article>
                        <article>
                            <label htmlFor="description">Description</label>
                            <input type="text" defaultValue={Exercise.description} id="description" name="description"></input>
                        </article>
                        <article>
                            <label htmlFor="duration">Duration</label>
                            <input type="number" defaultValue={Exercise.duration} id="duration" name="duration"></input>
                        </article>
                        <article>
                            <label htmlFor="date">Date</label>
                            <input type="datetime-local" defaultValue={Exercise.date} id="date" name="date"></input>
                        </article>
                    </div>
                    <div className="addButton">
                        <button className="secondaryButton">
                            Save
                        </button>
                    </div>
                </form>
            </PureModal>
        </>
    )
}