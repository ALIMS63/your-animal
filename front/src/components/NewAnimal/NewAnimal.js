import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { addNewAnimal } from '../../redux/actions'
// material-ui========================================
import { makeStyles,  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  color: {
    color: 'green',
    borderColor: 'green',
    background: 'white',
  },
  root: {
    //button
    '& > *': {
      margin: theme.spacing(1),
    },
    // разметка
    flexGrow: 1,
  },
  textar: {
    // textarea
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  // селекты
  formControl: {
    margin: "20px",
    minWidth: 300,
    
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  // разметка
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  margin: {
    marginBottom: "25"
  },
  ch: {
    margin: "8px",
  },
  input: {
    display: 'none',
  },
  lab: {
    color: 'black'
  }
}));
//======================================
function NewAnimal() {
  const dispatch = useDispatch();
  const allAnimals = useSelector((state) => state.animals.animals)
  const classes = useStyles();  //material-ui button
  const [error, setError] = useState(false);
  const history = useHistory();
  const [inputs, setInputs] = useState({
    bigType: '',
    kindDog: '',
    kindCat: '',
    kindOther: '',
    nickname: '',
    description: '',
    age: '',
    pay: true,
    price: '',
    adultSize: '',
    adultweight: '',
    possibleForAllergySufferers: false,
    longHaired: false,
    guideВog: false,
    serviceAnimal: false,
    warDog: false,
    pet: false,
    onlyInNonApartments: false,
    specialConditionsOfDetention: false,
    childrenInTheHouse: false,
    exotic: false,
    farmAnimal: false,
    photo: null,
    gender: 'девочка',
    pedigree: '',
    vaccinationРistory: '',
  });

  function changed({ target: { value, name } }) {
    setInputs({
      ...inputs,
      [name]: value,
    });
  }
  function fooCheckbox({ target: { name } }) {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: !prevInputs[name],
    }));
  }
  function photoChanged({ target: { files, name } }) {
    setInputs({
      ...inputs,
      [name]: files[0],
    });;
  }
  async function addAnimal(event) {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(inputs).forEach((key) => {
      formData.append(key, inputs[key])
    })
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    const response = await axios.post('/api/allAnimals', formData, config);
    const newAnimal = response.data
    if (inputs.bigType === 'собака') {
      dispatch(addNewAnimal('dogs', newAnimal))
      return history.push(`/oneAnimal/${newAnimal._id}`);
    }
    if (inputs.bigType === 'кот') {
      dispatch(addNewAnimal('cats', newAnimal))
      return history.push(`/oneAnimal/${newAnimal._id}`);
    }
    dispatch(addNewAnimal('other', newAnimal))
    return history.push(`/oneAnimal/${newAnimal._id}`);
  }

  return (
    <>
      <form onSubmit={addAnimal} encType="multipart/form-data" className='form-add'>
        <div className={classes.root}>
          <Grid container spacing={5} >
            {/* Тип, порода, кличка */}
            <Grid container direction="row" justify="space-evenly" alignItems="center" >
              <div className={classes.formControl}>
                <Autocomplete  inputProps={{ 'aria-label': 'Without label' }} name="bigType" inputValue={inputs.bigType} id="free-solo-demo" freeSolo
                  options={typeAnimal.map((option) => option.type)}
                  onInputChange={(event, newInputValue) => {
                    changed({ target: { value: newInputValue, name: 'bigType' } })
                  }}
                  renderInput={(params) => (
                    <TextField className={classes.color}  {...params} label="Тип животного" margin="normal" variant="outlined"
                      required />
                  )}
                />
              </div>
              {inputs.bigType === "собака" ?
                <div className={classes.formControl}>
                  <Autocomplete name="kindDog" inputValue={inputs.kindDog} id="free-solo-demo" freeSolo
                    options={kindDog.map((option) => option.type)}
                    onInputChange={(event, newInputValue) => {
                      changed({ target: { value: newInputValue, name: 'kindDog' } })
                    }}
                    renderInput={(params) => (
                      <TextField className={classes.color} {...params} label="Порода" margin="normal" variant="outlined"
                        required />
                    )}
                  />
                </div>
                : inputs.bigType === "кот" ?
                  <div className={classes.formControl}>
                    <Autocomplete name="kindCat" inputValue={inputs.kindCat} id="free-solo-demo" freeSolo
                      options={kindCat.map((option) => option.type)}
                      onInputChange={(event, newInputValue) => {
                        changed({ target: { value: newInputValue, name: 'kindCat' } })
                      }}
                      renderInput={(params) => (
                        <TextField className={classes.color} {...params} label="Порода" margin="normal" variant="outlined"
                          required />
                      )}
                    />
                  </div>
                  : <TextField  style={{background: 'white', minWidth: '300px', margin: "20px"}} name="kindOther" label="Порода" value={inputs.kindOther} onChange={changed} variant="outlined" id="outlined-basic" />
              }
              <TextField style={{background: 'white', minWidth: '300px', margin: "20px"}} variant="outlined" id="outlined-basic" name="nickname" label="Кличка" required value={inputs.nickname} onChange={changed} />
            </Grid>
            {/* Пол, возраст, Описание */}
            <Grid container direction="row" justify="space-evenly" alignItems="center" className={classes.formControl}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Пол</FormLabel>
                <RadioGroup aria-label="gender" name="gender" value={inputs.gender} onChange={changed}>
                  <FormControlLabel value="девочка" control={<Radio />} label="Female" />
                  <FormControlLabel value="мальчик" control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
              <TextField style={{background: 'white', minWidth: '300px', margin: "20px"}} id="outlined-number" label="Возраст" type="number" variant="outlined" name="age" required
                value={inputs.age} onChange={changed}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                style={{background: 'white', minWidth: '300px', margin: "20px"}}
                onChange={changed}
                name="description"
                id="outlined-multiline-static"
                label="Oписание"
                multiline
                rows={3}
                // cols={1}
                value={inputs.description}
                variant="outlined"
              />
            </Grid>
            {/* Даром, цена */}
            <Grid container direction="row" justify="center" alignItems="center" className={classes.formControl}>
              <label className={classes.formControl} htmlFor="pay">Даром:
          <Checkbox
                  className={classes.formControl}
                  name="pay"
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  checked={inputs.pay}
                  onChange={fooCheckbox}
                />
              </label>
              {inputs.pay ?
                <TextField disabled id="filled-disabled" label="цена" defaultValue="-" variant="filled" />
                : <TextField style={{background: 'white', minWidth: '300px', margin: "20px"}} id="outlined-number" label="Цена" type="number" variant="outlined" name="price" required
                  value={inputs.price} onChange={changed}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />}
            </Grid>
            {/* Родословная, история прививок */}
            <Grid container direction="row" justify="center" alignItems="center" className={classes.formControl}>
              <TextField style={{background: 'white', minWidth: '300px', margin: "20px"}} onChange={changed} name="pedigree" id="outlined-helperText" label="Родословная" value={inputs.pedigree} helperText="" variant="outlined" />
              <TextField style={{background: 'white', minWidth: '300px', margin: "20px"}} onChange={changed} name="vaccinationРistory" id="outlined-helperText" label="Имеются ли прививки?" value={inputs.vaccinationРistory} helperText="" variant="outlined" />
            </Grid>
            {/* Размер взрослого животного, вес взрослого животного */}
            <Grid container direction="row" justify="center" alignItems="center" className={classes.formControl}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">Размер взрослого животного</InputLabel>
                <Select
                  style={{background: 'white'}}
                  name="adultSize"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={inputs.adultSize}
                  onChange={changed}
                >
                  <MenuItem value="Очень маленькое (ориентир: как хомяк и меньше)">Очень маленькое (хомяк и меньше)</MenuItem>
                  <MenuItem value="Маленькое (ориентир: как кошка)">Маленькое (кошка)</MenuItem>
                  <MenuItem value="Среднее (ориентир: как бульдог)">Среднее (бульдог)</MenuItem>
                  <MenuItem value="Большое (ориентир: как сенбернар)">Большое (сенбернар)</MenuItem>
                  <MenuItem value="Очень большое (ориентир: как лошадь и более)">Очень большое (лошадь и более)</MenuItem>

                </Select>

              </FormControl>
              <TextField style={{background: 'white', minWidth: '300px', margin: "20px"}} onChange={changed} name="adultweight" id="outlined-helperText" label="Вес взрослого животного" value={inputs.adultweight} helperText="" variant="outlined" />
            </Grid>
            {/* Домашнее, экзотическое, сельскохозяйственное */}
            <Grid container direction="row" justify="space-evenly" alignItems="center" className={classes.ch}>
              <label className={classes.formControl} htmlFor="pet">Домашнее животное:
          <Checkbox
                  name="pet"
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  checked={inputs.pet}
                  onChange={fooCheckbox}
                />
              </label>
              <label className={classes.formControl} htmlFor="exotic">Экзотическое животное:
          <Checkbox

                  name="exotic"
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  checked={inputs.exotic}
                  onChange={fooCheckbox}
                />
              </label>
              <label className={classes.formControl} htmlFor="farmAnimal">Сельскохозяйственное животное:
          <Checkbox

                  name="farmAnimal"
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  checked={inputs.farmAnimal}
                  onChange={fooCheckbox}
                />
              </label>
            </Grid>
            {/* Служебное животное, служебная собака, собака-поводырь */}
            <Grid container direction="row" justify="space-around" alignItems="center" className={classes.ch}>
              <label className={classes.formControl} htmlFor="serviceAnimal">Cлужебное  животное:
          <Checkbox
                  name="serviceAnimal"
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  checked={inputs.serviceAnimal}
                  onChange={fooCheckbox}
                />
              </label>
              <label className={classes.formControl} htmlFor="warDog">Служебная собака:
          <Checkbox

                  name="warDog"
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  checked={inputs.warDog}
                  onChange={fooCheckbox}
                />
              </label>
              <label className={classes.formControl} htmlFor="guideВog">Собака-поводырь:
          <Checkbox

                  name="guideВog"
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  checked={inputs.guideВog}
                  onChange={fooCheckbox}
                />
              </label>
            </Grid>
            {/* Длинношерстное, хороший вариант для аллергиков */}
            <Grid container direction="row" justify="center" alignItems="center" className={classes.ch}>
              <label className={classes.formControl} htmlFor="longHaired">Длинношерстное:
          <Checkbox
                  name="longHaired"
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  checked={inputs.longHaired}
                  onChange={fooCheckbox}
                />
              </label>
              <label className={classes.formControl} htmlFor="possibleForAllergySufferers">Хороший вариант для аллергиков:
          <Checkbox

                  name="possibleForAllergySufferers"
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  checked={inputs.possibleForAllergySufferers}
                  onChange={fooCheckbox}
                />
              </label>
            </Grid>
            {/* Только в не квартиры, специальные условия содержания */}
            <Grid container direction="row" justify="center" alignItems="center" className={classes.ch}>
              <label className={classes.formControl} htmlFor="onlyInNonApartments">Только в не квартиры:
          <Checkbox
                  name="onlyInNonApartments"
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  checked={inputs.onlyInNonApartments}
                  onChange={fooCheckbox}
                />
              </label>
              <label className={classes.formControl} htmlFor="specialConditionsOfDetention">Специальные условия содержания:
          <Checkbox

                  name="specialConditionsOfDetention"
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  checked={inputs.specialConditionsOfDetention}
                  onChange={fooCheckbox}
                />
              </label>
            </Grid>
            {/* Дети в доме */}
            <Grid container direction="row" justify="space-around" alignItems="center" className={classes.ch}>
              <label htmlFor="childrenInTheHouse">Дети в доме:
          <Checkbox
                  name="childrenInTheHouse"
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  checked={inputs.childrenInTheHouse}
                  onChange={fooCheckbox}
                />
              </label>
            </Grid>
          </Grid>
        </div>
        {/* кнопка добавления животного */}
        <label htmlFor="photo">Загрузите фотографию животного: {' '}
          <input type="file" name="photo" id="photo" accept="image/*,image/jpeg" onChange={photoChanged} />
        </label>
        {/* отправить форму */}
        <div className={classes.root}>
          <Button type="submit" variant="contained" color="primary">Добавить животное</Button>
        </div>
        {/* место для сообщения об ошибке */}
        {error && <div className="error">{error}</div>}
      </form>
    </>
  )
}

const typeAnimal = [
  { type: 'собака' },
  { type: 'кот' },
  { type: 'Впишите свой вариант' },
];
const kindDog = [
  { type: 'Впишите свой вариант' },
  { type: 'Немецкий шпиц' },
  { type: 'Йоркширский терьер' },
  { type: 'Чихуахуа' },
  { type: 'Немецкая овчарка' },
  { type: 'Лабрадор-ретривер' },
  { type: 'Хаски' },
  { type: 'Джек-рассел-терьерог' },
  { type: 'Среднеазиатская овчарка' },
  { type: 'Кавказская овчарка' },
  { type: 'Вельш-корги пемброк' },
  { type: 'Золотистый ретривер' },
  { type: 'Французский бульдог' },
  { type: 'Кокер-спаниель' },
  { type: 'Английский бульдог' },
  { type: 'Бигль' },
  { type: 'Пудель' },
  { type: 'Ротвейлер' },
  { type: 'Дог' },
  { type: 'Беспородная' },
];
const kindCat = [
  { type: 'Персидский кот' },
  { type: 'Британская короткошерстная.' },
  { type: 'Скоттиш-фолд' },
  { type: 'Сибирская' },
  { type: 'Мейн-кун' },
  { type: 'Сфинкс' },
  { type: 'Рекс' },
  { type: 'Персидская' },
  { type: 'Невская маскарадная' },
  { type: 'Русская голубая' },
  { type: 'Ориентальная' },
  { type: 'Сиамская' },
  { type: 'Шотландская вислоухая' },
  { type: 'Экзотическая кошка' },
  { type: 'Курильский бобтейл' },
  { type: 'Абиссинская' },
  { type: 'Австралийский мист' },
  { type: 'Азиатская (табби)' },
  { type: 'Акринская' },
  { type: 'Впишите свой вариант' },
];

export default NewAnimal;
