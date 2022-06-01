import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { disableDeal, getDiscounts, getSneakers } from "../../../Redux/Actions";
import s from "./../Orders/Orders.module.css";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { deleteUser, getAllUsers } from "../../../Redux/Actions";
import { useState } from "react";

const radios = [
    { name: "All", value: "all" },
    { name: "Activated", value: "enabled" },
    { name: "Disabled", value: "disabled" },
];

const TableDeals = ({ showModalDelete, setModalDeleteDeal, state }) => {
    const dealsAll = useSelector((state) => state.getDiscounts);
    const token = useSelector((state) => state.getToken);

    const dispatch = useDispatch();
    const [stateF, setstate] = useState("all");

    let deals;
    if (stateF === 'enabled') {
        deals = dealsAll.filter(u => u.deleted === false)
    } else if (stateF === 'disabled') {
        deals = dealsAll.filter(u => u.deleted === true)
    } else {
        deals = dealsAll
    }

    const deleteDeal = (e) => {
        e.preventDefault();
        showModalDelete();
        setModalDeleteDeal({
            show: true,
            msg: `Are you sure do you want to delete the discount id. ${e.target.value}?`,
            title: `Delete Discount`,
            action: async () => {
                await dispatch(disableDeal(e.target.value, token));
                await dispatch(getDiscounts());
                await dispatch(getSneakers());
            },
        });
    };

    return (
        <>
            <div className={s.btn}>
                <ButtonGroup className="mb-2">
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={stateF === radio.value}
                            onChange={(e) => setstate(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </div>
            <Table hover className={s.table}>
                <thead className={s.thead}>
                    <tr>
                        <th>active</th>
                        <th>id</th>
                        <th>Sneaker Model</th>
                        <th>Percentage</th>
                        <th>Creation Date</th>
                        <th>Expiration Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className={s.tbody}>
                    {deals.length > 0 &&
                        deals.map((deal, i) => (
                            <tr key={deal.id}>
                                <td>{deal.deleted ? `❌ ` : `✅`}</td>
                                <td>{deal.id}</td>
                                <td>{deal.sneakerModel}</td>
                                <td>{deal.percentage}</td>
                                <td>{deal.creation}</td>
                                <td>{deal.expiration}</td>
                                <td>
                                    <button
                                        value={deal.id}
                                        className={s.delete}
                                        onClick={deleteDeal}
                                        disabled={deal.deleted}
                                    >
                                        ✖︎
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    );
};

export default TableDeals;
