import React, { useState, useEffect } from 'react';
import classes from './GraphSettings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { contactServer } from '../../../store/actions/index';
import Spinner from '../../UI/LoadingIndicator/LoadingIndicator';
import Slider from '@material-ui/core/Slider';

const GraphSettings = () => {
	const dispatch = useDispatch();
	const activeRoomNumber = useSelector((state) => state.room.activeRoomNumber);
	const selectedInterval = useSelector((state) => state.data.selectedInterval);
	const loading = useSelector((state) => state.data.loading);
	const activeDate = useSelector((state) => state.data.activeDate);

	const [ sliderValue, setSliderValue ] = useState(24);

	useEffect(
		() => {
			const timer = setTimeout(() => {
				if (sliderValue !== selectedInterval) {
					dispatch(contactServer(activeRoomNumber, sliderValue, activeDate));
				}
			}, 500);
			return () => {
				clearTimeout(timer);
			};
		},
		[ activeRoomNumber, sliderValue, activeDate, selectedInterval, dispatch ]
	);

	const onChangeHandler = (value) => {
		setSliderValue(value);
	};

	return (
		<div className={classes.Wrapper}>
			<div className={classes.SelectorWrapper}>
				<p className={classes.Text}>Zobraz dáta za posledných: {sliderValue} hodín</p>
				<div className={classes.SliderWrapper}>
					<Slider
						className={classes.Slider}
						defaultValue={24}
						getAriaValueText={onChangeHandler}
						aria-labelledby="discrete-slider"
						valueLabelDisplay="auto"
						step={1}
						marks
						min={1}
						max={24}
					/>
				</div>
			</div>
			<div className={classes.LoaderWrapper}>{loading ? <Spinner /> : null}</div>
		</div>
	);
};

export default GraphSettings;
