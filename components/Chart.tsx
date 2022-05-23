import { NextPage } from "next";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { ALL_CATEGORY_KEY, Category, ToDo } from "../pages";
import styles from "../styles/Home.module.css";
import CategorySelect from "./CategorySelect";

type ChartProps = {
	toDos: ToDo[];
	categories: Category[];
};

type ChartData = {
	name: string;
	value: number;
}[];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (
	{ cx, cy, midAngle, innerRadius, outerRadius, index }: any,
	chartData: ChartData
) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill={index === 0 ? "#171717" : "#f5f5f5"}
			textAnchor="middle"
			dominantBaseline="central"
		>
			{index === 0
				? `To-do (${chartData[0].value})`
				: `Done (${chartData[1].value})`}
		</text>
	);
};

const Chart: NextPage<ChartProps> = ({ toDos, categories }) => {
	const [category, setCategory] = useState<Category | typeof ALL_CATEGORY_KEY>(
		ALL_CATEGORY_KEY
	);
	const [chartData, setChartData] = useState<ChartData>([]);

	useEffect(() => {
		setChartData(
			toDos.reduce<ChartData>(
				(acc, toDo) => {
					if (
						category === ALL_CATEGORY_KEY ||
						toDo.category.key === category.key
					) {
						acc[toDo.done ? 1 : 0].value += 1;
					}
					return acc;
				},
				[
					{ name: "To-do", value: 0 },
					{ name: "Done", value: 0 },
				]
			)
		);
	}, [toDos, category]);

	return (
		<div>
			<label htmlFor="select-category">Select category:</label>
			<CategorySelect
				categories={categories}
				selectedCategory={category || ALL_CATEGORY_KEY}
				onSelectCategory={setCategory}
				showAll={true}
			/>

			{chartData.some(({ value }) => value > 0) ? (
				<PieChart width={300} height={300}>
					<Pie
						dataKey="value"
						data={chartData}
						label={(entry) => renderCustomizedLabel(entry, chartData)}
					>
						<Cell key={`cell-0`} fill={"#e2e8f0"} />
						<Cell key={`cell-1`} fill={"#10b981"} />
					</Pie>
				</PieChart>
			) : (
				<div className={styles.nodata}>Add some to-dos to see chart</div>
			)}
		</div>
	);
};

export default Chart;
