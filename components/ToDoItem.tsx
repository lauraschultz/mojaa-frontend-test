import { NextPage } from "next";
import { Category, ToDo } from "../pages";
import styles from "../styles/Home.module.css";
import CategorySelect from "./CategorySelect";
import TrashIcon from "./TrashIcon";

type ToDoItemProps = {
	toDo: ToDo;
	categories: Category[];
	updateToDo: (key: string, newToDo: Partial<ToDo>) => void;
	onDelete: () => void;
	createCategory: () => Category;
};

const ToDoItem: NextPage<ToDoItemProps> = ({
	toDo,
	categories,
	updateToDo,
	onDelete,
	createCategory,
}) => {
	return (
		<div className={styles.todoitem}>
			<div>
				<input
					checked={toDo.done}
					type="checkbox"
					id={toDo.key}
					onChange={() => updateToDo(toDo.key, { done: !toDo.done })}
				/>
				<label htmlFor={toDo.key} className={toDo.done ? styles.done : ""}>
					{toDo.name}
				</label>
			</div>

			<div>
				<CategorySelect
					categories={categories}
					selectedCategory={toDo.category}
					onSelectCategory={(c: any) =>
						updateToDo(toDo.key, { category: c as Category })
					}
					createCategory={createCategory}
				/>

				<button onClick={() => onDelete()} className={styles.trash}>
					<TrashIcon />
				</button>
			</div>
		</div>
	);
};

export default ToDoItem;
