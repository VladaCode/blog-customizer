// src/App.tsx
import { useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import styles from './app.module.scss';

export const App = () => {
	const [articleStateApp, setArticleStateApp] = useState(defaultArticleState);

	const handleApply = (newState: ArticleStateType) => {
		console.log('Стили', newState);
		setArticleStateApp(newState);
	};

	const handleReset = () => {
		console.log('Сброс стилей');
		setArticleStateApp(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleStateApp.fontFamilyOption.value,
					'--font-size': articleStateApp.fontSizeOption.value,
					'--font-color': articleStateApp.fontColor.value,
					'--container-width': articleStateApp.contentWidth.value,
					'--bg-color': articleStateApp.backgroundColor.value,
				} as React.CSSProperties
			}>
			<ArticleParamsForm
				onApply={handleApply}
				onReset={handleReset}
				initialState={articleStateApp}
			/>
			<Article />
		</main>
	);
};