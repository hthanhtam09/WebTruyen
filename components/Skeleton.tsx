import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core';

interface SkeletonLoadingProps {
    width?: number | string;
    height?: number | string;
    style?: string
}

const SkeletonLoading = ({width, height, style}: SkeletonLoadingProps) => {
  const classes = useStyles();
  return <Skeleton classes={{ root: classes.root }} className={`${style}`} animation="pulse" height={height} width={width} />;
};

export default SkeletonLoading;

const useStyles = makeStyles({
  root: {
    backgroundColor: '#B0B0B0',
    display: 'inline-block',
    lineHeight: 2.5
  },
});
