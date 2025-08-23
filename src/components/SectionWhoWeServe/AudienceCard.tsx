// components/AudienceCard.tsx
import React from 'react'
import './AudienceCard.css' // For 3D flip animation
import FrontFace from './FrontFace'
import BackFace from './BackFace'

type AudienceCardProps = {
  id: string
  headline: string
  description: string
  isActive: boolean
  onClick: () => void
  colorClass: string
}

const AudienceCard: React.FC<AudienceCardProps> = ({
  headline,
  description,
  isActive,
  onClick,
  colorClass,
}) => {
  return (
    <div className="audience-card-wrapper" onClick={onClick}>
      <div className={`audience-card-inner ${isActive ? 'flipped' : ''}`}>
        <div className={`audience-card-front ${colorClass}`}>
          <FrontFace headline={headline} gradient={colorClass} />
        </div>
        <div className={`audience-card-back ${colorClass}`}>
          <BackFace headline={headline} description={description} />
        </div>
      </div>
    </div>
  )
}

export default AudienceCard
