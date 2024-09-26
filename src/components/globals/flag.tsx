type FlagProps = {
  countryOfOrigin: string
}
function Flag({ countryOfOrigin }: FlagProps) {
  return (
    <img
      src={`http://purecatamphetamine.github.io/country-flag-icons/1x1/${countryOfOrigin.toLocaleUpperCase()}.svg`}
      width={10}
    />
  )
}

export default Flag
