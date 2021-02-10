import React, { useEffect, useState, useMemo } from "react";
import PureModal from "react-pure-modal";
import DataTable from "react-data-table-component";
import {inArray, getBaseApi} from "../common/functions";
import Header from "../components/Header.jsx";
import CloseIcon from "../assets/images/close.svg";
import "../styles/Users.scss";
import swal from "sweetalert";

export default function Users(props) {
    const [filterText, setFilterText] = useState("");
    const [data,setData] = useState([{"_id":"1"}]);
    const [addModal, setAddModal] = useState(false);
    
    const columns = [
        {
          name: "ID Client",
          selector: "_id",
          sortable: true,
        },
        {
          name: "User Name",
          selector: "username",
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
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const getUsers = () =>{
        fetch(getBaseApi() + "/users/")
        .then(res => res.json())
        .then(response => {
            if (response.result){
                setData(response.data);
            }else{
                swal({title: "Error", icon: "error", text:response.error.name})
            }
        }).catch((error) => swal({title: "Error", icon: "error", text:error.message}))
    }
    const onSubmitInsertUser = (e) => {
      e.preventDefault();
      let data = {
        username: e.target[0].value
      }
      fetch(getBaseApi() + "/users/add",{
        method: "POST",
        body: JSON.stringify(data),
        headers:{
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(response => {
        if (response.result){
          swal({title: "Success", icon: "success", text:"Change was made correctly"})
          setAddModal(false);
          getUsers();
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
    return(
        <>
            <Header active="users"/>
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
                <h2>Client Information</h2>
                <form className="addClientsModal" onSubmit={e => onSubmitInsertUser(e)}>
                    <div className="generalInfo">
                        <article>
                            <label htmlFor="userName">User Name</label>
                            <input type="text" id="userName" name="userName"></input>
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