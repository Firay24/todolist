export const uniqueValues = (props: { data: any; criteria: string }) => {
  const uniqueValues = [
    ...new Set(props.data.map((item) => item[props.criteria])),
  ];
  return uniqueValues;
};
