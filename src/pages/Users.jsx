import React, { useEffect, useState, useMemo } from "react";
import PureModal from "react-pure-modal";
import DataTable from "react-data-table-component";
import {inArray} from "../common/functions";
import Header from "../components/Header.jsx";
import RemoveIcon from "../assets/images/remove-gold.svg";
import CloseIcon from "../assets/images/close.svg";
import "../styles/Users.scss";

export default function Users(props) {
    const [filterText, setFilterText] = useState("");
    const [method, setMethod] = useState("POST")
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
        {
          name: "Remove",
          cell: (row) => (
            <button>
              <img src={RemoveIcon} alt="Remove" />
            </button>
          ),
        },
        {
          name: "Edit",
          cell: (row) => (
            <button onClick={() => setAddModal(true)}>
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
                <form className="addClientsModal">
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