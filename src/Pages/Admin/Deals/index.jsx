import { useDispatch } from "react-redux";
import TableDeals from "./table";
import { getDiscounts, getOrders } from "../../../Redux/Actions";
import { useEffect, useState } from "react";
import ModalAdmin from "../ModalAdmin/ModalAdmin";

const DealsContent = () => {
    const dispatch = useDispatch();
    const [modalDeleteDeal, setModalDeleteDeal] = useState({
        show: false,
        msg: "",
        title: "",
        action: "",
    });
    

    useEffect(() => {
        dispatch(getDiscounts());
    }, []);

    return (
        <div>
            <h1>Deals</h1>
            <TableDeals
                showModalDelete={() =>
                    setModalDeleteDeal({ ...modalDeleteDeal, show: true })
                }
                setModalDeleteDeal={setModalDeleteDeal}
                state={modalDeleteDeal}
            />
            <ModalAdmin
                show={modalDeleteDeal.show}
                onHide={() => setModalDeleteDeal({ ...modalDeleteDeal, show: false })}
                action={modalDeleteDeal.action}
                msg={modalDeleteDeal.msg}
                title={modalDeleteDeal.title}
            />
        </div>
    );
};

export default DealsContent;
