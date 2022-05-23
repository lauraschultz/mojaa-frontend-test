import { NextPage } from "next";
import { useState } from "react";
import { Category, NEW_CATEGORY_KEY, ToDo } from "../pages";
import ToDoItem from "./ToDoItem";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/Home.module.css";
import CategorySelect from "./CategorySelect";

type ListProps = {
	toDos: ToDo[];
	categories: Category[];
	onAddToDo: (toDo: ToDo) => void;
	onDeleteToDo: (key: string) => void;
	onUpdateToDo: (key: string, toDo: Partial<ToDo>) => void;
	createCategory: () => Category;
};

const List: NextPage<ListProps> = ({
	toDos,
	categories,
	onAddToDo,
	onDeleteToDo,
	onUpdateToDo,
	createCategory,
}) => {
	const [name, setName] = useState<string>("");
	const [category, setCategory] = useState<Category | typeof NEW_CATEGORY_KEY>(
		categories[0] || NEW_CATEGORY_KEY
	);

	return (
		<div>
			<div className={styles.newtodoform}>
				<h2>New to-do</h2>
				<form
					onSubmit={(e) => {
						const currentCategory =
							category === NEW_CATEGORY_KEY ? createCategory() : category;
						onAddToDo({
							key: uuidv4(),
							name,
							category: currentCategory,
							done: false,
						});
						setCategory(currentCategory);
						setName("");
						e.preventDefault();
					}}
				>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required={true}
						placeholder="To-do name"
					/>
					<div>
						<CategorySelect
							categories={categories}
							selectedCategory={category}
							onSelectCategory={(c: any) => setCategory(c as Category)}
							createCategory={createCategory}
						/>

						<button type="submit">Add</button>
					</div>
				</form>
			</div>
			{toDos.map((toDo) => (
				<ToDoItem
					key={toDo.key}
					categories={categories}
					toDo={toDo}
					onDelete={() => onDeleteToDo(toDo.key)}
					updateToDo={onUpdateToDo}
					createCategory={createCategory}
				></ToDoItem>
			))}
		</div>
	);
};

export default List;
