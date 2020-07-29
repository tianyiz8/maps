export default (selectedState, data) => {
  console.log(selectedState)
  const stateEx = data.filter(entry => {
    const condition1 = entry.state_orig === selectedState
    return condition1 
  })
  const stateIm = data.filter(entry => {
    const condition2 = entry.state_dest === selectedState;
    return condition2;
  })
  let balance2012 = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0
  }
  let balance2017 = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0
  }
  stateEx.forEach(entry => {
    if (entry.year === '2017') {
      balance2017[entry.sctg2] += parseFloat(entry.value);
    } else {
      balance2012[entry.sctg2] += parseFloat(entry.value);
    }
  })
  stateIm.forEach(entry => {
    if (entry.year === '2017') {
      balance2017[entry.sctg2] -= parseFloat(entry.value);
    } else {
      balance2012[entry.sctg2] -= parseFloat(entry.value);
    }
  })
  const jsonstate = [
    { year: '2017', sctg2: '1', sctg2_description: 'Animals & fish (live)', value: balance2012['1']},
    { year: '2017', sctg2: '2', sctg2_description: 'Cereal grains and seed', value: balance2012['2']},
    { year: '2017', sctg2: '3', sctg2_description: 'Agricultural products (excl. feed, grains, and forage)', value: balance2012['3']},
    { year: '2017', sctg2: '4', sctg2_description: 'Animal feed, eggs, honey, other products of animal origin', value: balance2012['4']},
    { year: '2017', sctg2: '5', sctg2_description: 'Meat, poultry, fish, seafood, and preparations', value: balance2012['5']},
    { year: '2017', sctg2: '6', sctg2_description: 'Milled grain products and preparations and bakery products', value: balance2012['6']},
    { year: '2017', sctg2: '7', sctg2_description: 'Other prepared foodstuffs and preparations', value: balance2012['7']},
    { year: '2012', sctg2: '1', sctg2_description: 'Animals & fish (live)', value: balance2017['1']},
    { year: '2012', sctg2: '2', sctg2_description: 'Cereal grains and seed', value: balance2017['2']},
    { year: '2012', sctg2: '3', sctg2_description: 'Agricultural products (excl. feed, grains, and forage)', value: balance2017['3']},
    { year: '2012', sctg2: '4', sctg2_description: 'Animal feed, eggs, honey, other products of animal origin', value: balance2017['4']},
    { year: '2012', sctg2: '5', sctg2_description: 'Meat, poultry, fish, seafood, and preparations', value: balance2017['1']},
    { year: '2012', sctg2: '6', sctg2_description: 'Milled grain products and preparations and bakery products', value: balance2017['5']},
    { year: '2012', sctg2: '7', sctg2_description: 'Other prepared foodstuffs and preparations', value: balance2017['6']}
  ]
  return jsonstate
}

