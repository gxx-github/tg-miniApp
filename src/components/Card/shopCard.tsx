import type React from "react"
import "./shopCard.scss"
import goodsImg from '../../assets/home/goods.png'
import dropTips from '../../assets/home/drop.svg'
import normalTips from '../../assets/home/normal.svg'
interface ShopCardProps {
  level: "S" | "A" | "B" | "C"
  imageUrl: string
  title: string
  description: string
  progress: number // 0-100
  className?: string
}

const ShopCard: React.FC<ShopCardProps> = ({ level, imageUrl, title, description, progress, className = "" }) => {
  // 确保进度值在 0-100 之间
  const normalizedProgress = Math.min(100, Math.max(0, progress))

  // 根据等级获取对应的类名
  const getLevelClassName = () => {
    switch (level) {
      case "S":
        return dropTips
      case "A":
        return normalTips
      default:
        return ""
    }
  }

  return (
    <div className={`shop-card ${className}`}>
      {/* 商品等级标签 */}
      <div className={`level-tag ${getLevelClassName()}`}>
        <img src={getLevelClassName()} alt="" />
      </div>

      {/* 商品图片 */}
      <div className="image-wrapper">
        <img src={goodsImg } alt={title} className="product-image" />
      </div>

      {/* 商品信息 */}
      <div className="card-content">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>

        {/* 进度条 */}
        <div className="progress-wrapper">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${normalizedProgress}%` }} />
          
          </div>
          <span>{normalizedProgress}%</span>
        </div>
      </div>
    </div>
  )
}

export default ShopCard

