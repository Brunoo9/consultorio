import { useState } from "react";

const useModalActive = () => {
  const [modalView, setModalView] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);

  const handleStateView = (value) => setModalView(value);
  const handleStateEdit = (value) => setModalEdit(value);
  const handleStateCreate = (value) => setModalCreate(value);

  return [
    { modalView, modalEdit, modalCreate },
    { handleStateView, handleStateEdit, handleStateCreate },
  ];
};

export default useModalActive;
