import { ref, onMounted, onUnmounted } from 'vue';

export const deviceTypes = ['mobile', 'tablet', 'desktop'] as const;

export type DeviceType = typeof deviceTypes[number];

export function useDeviceType() {
  const deviceType = ref<DeviceType>('desktop');

  const updateDeviceType = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      deviceType.value = 'mobile';
    } else if (screenWidth < 1024) {
      deviceType.value = 'tablet';
    } else {
      deviceType.value = 'desktop';
    }

  };


  onMounted(() => {
    window.addEventListener('resize', updateDeviceType);
    updateDeviceType(); // 初始化设备类型
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateDeviceType);
  });

  return deviceType;
}
