const ProfileStatistic = (props) => {
  const { unit, number } = props

  return (
    <div className="p-1.5 border-spacing-px-4">
      <p className="text-bold">{number}</p>
      <p>{unit}</p>
    </div>
  )
}

export default ProfileStatistic
