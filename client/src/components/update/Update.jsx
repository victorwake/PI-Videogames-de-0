import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { putGame } from '../../helpers/putGame';
import { formControl } from '../../helpers/formControl';
import { getPlatforms, cleanAllFilters, getGenres, getGames } from '../../redux/actions'
import { Nav } from '../Nav/Nav';

export const UpDate = (props) => {

  const dispatch = useDispatch();
  const gameDetail = useSelector(state => state.gameDetail);
  const allGames = useSelector(state => state.allGames);
  const history = useHistory();
  const genres = useSelector(state => state.genres)
  const platforms = useSelector(state => state.platforms);
  const [errText, seterrText] = useState({});  
  const [input, setInput] = useState({
    name: gameDetail.name,
    img: gameDetail.img,
    description: gameDetail.description,
    released: gameDetail.released,
    rating: gameDetail.rating,
    genres: [],
    platforms: [],
  });
  const id = props.match.params.id
  
  if(!allGames.length && !genres.length && !platforms.length) {
    dispatch(getGames());
    dispatch(getGenres());
    dispatch(getPlatforms());
  }

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    seterrText(formControl({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  const handleCheck = (e) => {
    const value = e.target.value
    if (!input[e.target.name].includes(value)) {
      setInput({
        ...input,
        [e.target.name]: [...input[e.target.name], value]
      });
      seterrText(formControl({
        ...input,
        [e.target.name]: [...input[e.target.name], value]
      }));
    } else {
      setInput({
        ...input,
        [e.target.name]: input[e.target.name].filter(n => n !== value)
      });
      seterrText(formControl({
        ...input,
        [e.target.name]: input[e.target.name].filter(n => n !== value)
      }));
    }    
  };

  const handleSubmit = e => {
    e.preventDefault();
    putGame(id,input)
    dispatch(cleanAllFilters());
    dispatch(getGames());
    history.push('/setgame');
  };


const disabled = Object.keys(errText).length || !input.name // para que se pueda mandar tiene que ser false

  return (
    <div className='condcr1'>
        <div className='imgbackcr'><img  alt=''/></div>
        <div className='contcr2 '><Nav /></div>
        <div className='contcr3'>
          <div className='contcr4'>

            <form onSubmit={handleSubmit}>

              <div className='contizq'>
                <label className='labelform'>
                  Name {errText.name && <span className='redspan'>》》 {errText.name}</span>}
                </label>
                <input className='inputform'
                  name='name' value={input.name}
                  maxLength= '30'
                  onChange={handleChange}
                /> 

                <label className='labelform' >
                  Rating {errText.rating && <span className='redspan'>》》 {errText.rating}</span>}
                </label>
                <input className='inputform'
                  name='rating'
                  type='number'
                  step='0.1'
                  min='0'
                  max='5'
                  value={input.rating} 
                  onChange={handleChange}
                />

                <label className='labelform'>
                  Release date {errText.released && <span  className='redspan'>》》 {errText.released}</span>}
                </label>
                <input className='inputform'
                  name='released'
                  placeholder= '2022-08-09'
                  value={input.released}
                  onChange={handleChange}
                />                 
                <label className='labelform'>
                  Description {errText.description && <span  className='redspan'>》》 {errText.description}</span>}
                </label>
                <textarea className='inputform'
                  name='description'
                  value={input.description} 
                  maxLength= '500'
                  onChange={handleChange}
                />

                <label className='labelform'>
                  URL Image {errText.img && <span  className='redspan'>》》 {errText.img}</span>}
                </label>
                <input className='inputform'
                  name='img'
                  placeholder= 'url...'
                  value={ input.img }
                  onChange={handleChange}
                />
              </div>
          

              <div className='contder'>
                <div className='contchecks'>
                  <div>
                    <label className='labelform'>
                      Genres
                    </label> {errText.genres && <span  className='redspan'>》》 {errText.genres}</span>}                        
                      { genres.map(g => (
                        <div className="contcheck1" key={g.id}>
                          <input className='inputcheck'
                            name='genres'
                            type="checkbox"
                            value={g.name}
                            onChange={handleCheck}
                          /> <label htmlFor={g.id}>{g.name}</label>
                        </div>
                      )) }
                  </div>
                </div>

                <div className='contchecks'>
                  <div>
                    <label className='labelform'>
                      Platforms
                    </label> {errText.platforms && <span  className='redspan'>》》 {errText.platforms}</span>}                   
                      {platforms.map(p => (
                        <div className="contcheck1" key={p.id}>
                          <input className='inputcheck'
                            name='platforms'
                            type="checkbox"
                            value={p.name}
                            onChange={handleCheck}
                          /> <label htmlFor={p.id}>{p.name}</label>               
                        </div>
                      )) }                    
                  </div> 
                </div>
              </div>

              <div>
                <input
                className='crbut'
                disabled={disabled}
                type="submit"
                value='Update'
                />
              </div>
            </form>
          </div>
        </div>
        <div className='slidescr'></div>
        <div className='pagcr'></div>
    </div>

  );
};
