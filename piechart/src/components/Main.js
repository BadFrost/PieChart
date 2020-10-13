import React from 'react';
import { makeStyles, Container, Button, Typography } from '@material-ui/core';
import randomColor from 'randomcolor';
import history from '../history';
import axios from 'axios';
import '../App.css';

const useStyles = makeStyles({
  header: {
    position: 'absolute',
    background: '#ffffff',
    width: '100%',
    height: '6%',
    top: '0px',
    left: '0px'
  },
  mainBtn: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    color: '#4557d1',
    width: '6%',
    height: '100%',
    left: '0%',
    borderRadius: '0px',
  },
  addBtn: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    color: '#4557d1',
    width: '6%',
    height: '100%',
    left: '6%',
    borderRadius: '0px'
  },
  sign: {
    position: 'absolute',
    width: '14%',
    height: '5%',
    top: '25%',
    right: '1%'
  },
  pieChartContainer: {
    position: 'absolute',
    width: '40%',
    height: '40%',
    top: '20%',
    left: '15%'
  },
  legendContainer: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    color: '#4557d1',
    width: '20%',
    height: '10%',
    top: '20%',
    left: '55%'
  },
  legendSign: {
    position: 'absolute',
    width: '30%',
    height: '5%',
    top: '5%',
    left: '43%'
  },
  lgndItems: {
    position: 'relative',
    color: 'black',
    width: '50%',
    height: '5%',
    top: '45%',
    left: '37%'
  }
});

export const Main = () => {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [info, setInfo] = React.useState({});
  const [sum, setSum] = React.useState(0);
  
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios('http://localhost:3001/get')
      setData(res.data.data);
      let x = 0;
      for (let i = 0; i < res.data.data.length; i++) {
          x += Number(res.data.data[i].count);
          setSum(x);
      }
    };
    fetchData();
  }, []); 

  const dataPlain = {
    width: 400,
    height: 400,
    radius: 200,
    pieData: data
  };

  let Info = () => {
    return (
      <Typography gutterBottom variant="h6" className={classes.lgndItems}>{info.name}: {info.count} </Typography>
    )
  };

  let showInfo = (x, curr) => {
    setInfo(curr);
    setShow(true);
  };

  let PieChart = (props) => {
    let calculatePos = (width, height, radius, theta) => {
      return [(width / 2.0 + (radius * (Math.sin(theta)))),
      (height / 2.0 - (radius * (Math.cos(theta))))];
    };

    let calculatePathPlain = () => {
      const { width, height, radius } = { ...props };
      let theta = 0;
      let currentPos = calculatePos(width, height, radius, theta);
      const pathData = props.pieData.reduce((acc, curr, ind) => {
        theta += (curr.count / sum) * 2 * Math.PI;
        const nextPos = calculatePos(width, height, radius, theta);
        const isBigCurveInt = (curr.count / sum) > 0.5 ? 1 : 0;
        const path = <path
          d={`M${+width / 2} ${+height / 2} L ${currentPos[0]} ${currentPos[1]} A ${radius} ${radius} 0 ${isBigCurveInt} 1 ${nextPos[0]} ${nextPos[1]} L ${width / 2.0} ${height / 2.0}`}
          fill={randomColor()}
          fillOpacity={1}
          key={ind}
          onMouseOver={x => showInfo(x, curr)}
        />;
        currentPos = nextPos;
        acc.push(path);
        return acc;
      }, []);
      return pathData;
    };
  
    return (
      <svg className="pieSVG" height={props.height} width={props.width}>
        {calculatePathPlain()}
      </svg>
    )
  };
  
  return (
    <Container>
      <Container maxWidth={false} className={classes.header}>
        <Button disabled={true} className={classes.mainBtn}>MAIN</Button>
        <Button className={classes.addBtn} onClick={() => history.push('/add')}>ADD</Button>
        <Typography gutterBottom variant="h6" className={classes.sign}>by VALENTYN KUZNETSOV</Typography>
      </Container>
      <Container className={classes.pieChartContainer}>
        <PieChart {...dataPlain} />
      </Container>
      <Container className={classes.legendContainer}>
        <Typography gutterBottom variant="h6" className={classes.legendSign}>INFO</Typography>
        {show ? Info() : ''}
      </Container>
      
    </Container>
  );
}
