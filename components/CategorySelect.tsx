import { NextPage } from "next";
import { ALL_CATEGORY_KEY, Category, NEW_CATEGORY_KEY } from "../pages";
import styles from "../styles/Home.module.css";

type CategorySelectProps = {
	categories: Category[];
	selectedCategory:
		| Category
		| typeof NEW_CATEGORY_KEY
		| typeof ALL_CATEGORY_KEY;
	onSelectCategory: (category: Category | typeof ALL_CATEGORY_KEY) => void;
	createCategory?: () => Category;
	showAll?: boolean;
};

const CategorySelect: NextPage<CategorySelectProps> = ({
	categories,
	selectedCategory,
	onSelectCategory,
	createCategory,
	showAll = false,
}) => {
	return (
		<select
			className={styles.categoryselect}
			value={
				typeof selectedCategory === "string"
					? selectedCategory
					: selectedCategory.key
			}
			onChange={(e) => {
				onSelectCategory(
					e.target.value === NEW_CATEGORY_KEY
						? createCategory!()
						: e.target.value === ALL_CATEGORY_KEY
						? ALL_CATEGORY_KEY
						: categories.find((c) => c.key === e.target.value)!
				);
			}}
		>
			{showAll && <option value={ALL_CATEGORY_KEY}>All</option>}
			{categories.map((c) => (
				<option value={c.key} key={c.key}>
					{c.name}
				</option>
			))}
			{createCategory && (
				<option value={NEW_CATEGORY_KEY}>New category...</option>
			)}
		</select>
	);
};

export default CategorySelect;
