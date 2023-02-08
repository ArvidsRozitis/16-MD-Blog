import style from "./Buttons.module.scss"
import deleteIcon from "../../assets/icons/delete-icon.svg";
export const ButtonDelete = (onClickDelete: any) => {
  return (
    <div>
      <button className={style.buttonDelete} onClick={() => onClickDelete}>
        <img src={deleteIcon} alt="del" />
      </button>
    </div>
  );
};

export default ButtonDelete;
