/**
 * 都市選択タブコンポーネント
 * ユーザーが表示したい都市を選択できるタブUIを提供
 */
import React from 'react';

/**
 * LocationTabsコンポーネントのプロパティ
 */
interface LocationTabsProps {
  /** 表示する都市一覧 */
  locations: string[];
  /** 現在選択されている都市 */
  selectedLocation: string;
  /** 都市変更時のコールバック関数 */
  onLocationChange: (location: string) => void;
}

const LocationTabs: React.FC<LocationTabsProps> = ({ locations, selectedLocation, onLocationChange }) => {
  return (
    <div className="location-tabs">
      {/* 各都市に対してタブボタンを生成 */}
      {locations.map(location => (
        <button
          key={location}
          className={`tab ${selectedLocation === location ? 'active' : ''}`} // 選択中のタブにactiveクラスを付与
          onClick={() => onLocationChange(location)} // クリック時に都市変更
        >
          {location}
        </button>
      ))}
    </div>
  );
};

export default LocationTabs;