<template>
  <div>
    <a-modal
      v-model:open="open"
      title="创智实验室活动日历"
      footer=""
      width="60%"
      :centered="true"
      :mask-closable="false"
      :keyboard="false"
      :closable="true"
      :destroy-on-close="false"
      class="calendar-modal"
    >
      <a-calendar v-model:value="value">
        <template #dateCellRender="{ current }">
          <ul class="events">
            <li v-for="item in getListData(current)" :key="item.content">
              <a-badge :status="item.type" :text="item.content" class="activity-badge" @click="item.onClick"/>
            </li>
          </ul>
        </template>
        <template #monthCellRender="{ current }">
          <div v-if="getMonthData(current)" class="notes-month">
            <section>{{ getMonthData(current) }}</section>
            <span>本月活动数</span>
          </div>
        </template>
      </a-calendar>
    </a-modal>

    <a-modal
      v-model:open="activityDetailOpen"
      :title="selectedActivity?.intro || '活动详情'"
      footer=""
      width="40%"
      :centered="true"
      :mask-closable="true"
      :keyboard="true"
      :closable="true"
      :destroy-on-close="true"
      class="activity-detail-modal"
    >
      <template v-if="selectedActivity">
        <a-descriptions bordered>
          <a-descriptions-item label="活动状态">
            <a-badge :status="getActivityStatusType(selectedActivity.status)" :text="getStatusText(selectedActivity.status)" />
          </a-descriptions-item>

          <a-descriptions-item label="开始时间">
            {{ dayjs(selectedActivity.sdate).format('YYYY年MM月DD日') }}
          </a-descriptions-item>

          <a-descriptions-item label="结束时间">
            {{ dayjs(selectedActivity.edate).format('YYYY年MM月DD日') }}
          </a-descriptions-item>

          <a-descriptions-item label="参与人员" :span="3">
            {{ selectedActivity.joiners }}
          </a-descriptions-item>

          <a-descriptions-item label="创建时间">
            {{ dayjs(selectedActivity.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
          </a-descriptions-item>

          <a-descriptions-item label="更新时间" :span="2">
            {{ dayjs(selectedActivity.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
          </a-descriptions-item>

          <a-descriptions-item label="活动详情" :span="3">
            {{ selectedActivity.detail }}
          </a-descriptions-item>
        </a-descriptions>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from 'vue';
import { CarryOutOutlined } from '@ant-design/icons-vue';
import dayjs, { Dayjs } from 'dayjs';
import { getActivitiesApi } from '~/api/activity';
import type { ActiInfo } from '#/data';
import {
  Modal as AModal,
  Badge as ABadge,
  Descriptions as ADescriptions,
  DescriptionsItem as ADescriptionsItem
} from 'ant-design-vue';

const open = ref<boolean>(false);
const showCalen = () => {
  open.value = true;
};

// 活动数据
const activities = ref<ActiInfo[]>([]);
const value = ref<Dayjs>();
const activitiesLoaded = ref(false);
const activityDetailOpen = ref<boolean>(false);
const selectedActivity = ref<ActiInfo | null>(null);

// 获取活动数据
const fetchActivities = async () => {
  try {
    const response = await getActivitiesApi();
    console.log('API完整响应:', response);

    // response已经是经过处理的result数据了
    activities.value = Array.isArray(response) ? response : [];

    // 统一格式化为YYYY-MM-DD格式
    activities.value.forEach(activity => {
      if (activity.sdate) {
        activity.sdate = dayjs(activity.sdate).format('YYYY-MM-DD');
      }
    });

    console.log('处理后的活动数据:', activities.value);
    activitiesLoaded.value = true;
  } catch (error) {
    console.error('获取活动数据失败:', error);
    activities.value = [];
    activitiesLoaded.value = true;
  }
};

const getStatusText = (status: number): string => {
  switch (status) {
    case 0:
      return '未开始';
    case 1:
      return '进行中';
    case 2:
      return '已结束';
    default:
      return '未知状态';
  }
};

// 根据日期获取活动列表
const getListData = (current: Dayjs) => {
  if (!activities.value?.length) return [];

  const currentDate = current.format('YYYY-MM-DD');

  return activities.value
    .filter(activity => activity.sdate === currentDate)
    .map(activity => ({
      type: getActivityStatusType(activity.status),
      content: activity.intro,
      rawActivity: activity, // 保存原始活动数据
      onClick: () => handleActivityClick(activity) // 添加点击处理函数
    }));
};

// 添加点击处理函数
const handleActivityClick = (activity: ActiInfo) => {
  selectedActivity.value = activity;
  activityDetailOpen.value = true;
};

// 获取月度活动数量
const getMonthData = (value: Dayjs) => {
  if (!activities.value) return 0;

  const year = value.year();
  const month = value.month() + 1; // Dayjs 月份从 0 开始

  const monthActivities = activities.value.filter(activity => {
    const startDate = new Date(activity.sdate);
    const activityYear = startDate.getFullYear();
    const activityMonth = startDate.getMonth() + 1;

    return activityYear === year && activityMonth === month;
  });

  return monthActivities.length;
};

// 根据活动状态返回对应的标记类型
const getActivityStatusType = (status: number): 'success' | 'warning' | 'error' => {
  switch (status) {
    case 0:  // 未开始
      return 'warning';
    case 1:  // 进行中
      return 'success';
    case 2:  // 已结束
      return 'error';
    default:
      return 'warning';
  }
};

// 事件监听器函数
const handleShowCalendar = () => {
  console.log('收到显示日历事件');
  showCalen();
};

onMounted(async () => {
  await fetchActivities();
  // 可以添加重试机制
  if (!activities.value.length) {
    console.log('尝试重新获取活动数据');
    await fetchActivities();
  }
  
  // 监听来自header的显示日历事件
  window.addEventListener('showCalendar', handleShowCalendar);
  console.log('日历事件监听器已添加');
});

// 清理事件监听器
onUnmounted(() => {
  window.removeEventListener('showCalendar', handleShowCalendar);
  console.log('日历事件监听器已移除');
});
</script>

<style lang="scss" scoped>


.events {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 80px;
  overflow-y: auto;

  li {
    margin-bottom: 4px;
    padding: 0 4px;

    :deep(.ant-badge-status) {
      cursor: pointer;
      width: 100%;
      overflow: hidden;
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:hover {
        opacity: 0.5;
      }
    }

    :deep(.ant-badge-status-dot) {
      position: relative;
      top: -1px;
    }
  }
}

.notes-month {
  text-align: center;

  section {
    font-size: 28px;
  }

  span {
    font-size: 12px;
  }
}

:deep(.ant-descriptions-item-label) {
  width: 100px;
  min-width: 100px;
}

:deep(.ant-descriptions-bordered .ant-descriptions-item-content) {
  padding: 12px 16px;
}

/* 日历弹窗样式 */
.calendar-modal {
  :deep(.ant-modal) {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    margin: 0 !important;
  }

  :deep(.ant-modal-content) {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  :deep(.ant-modal-header) {
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 24px;
  }

  :deep(.ant-modal-body) {
    padding: 24px;
    max-height: 70vh;
    overflow-y: auto;
  }
}

/* 活动详情弹窗样式 */
.activity-detail-modal {
  :deep(.ant-modal) {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    margin: 0 !important;
  }

  :deep(.ant-modal-content) {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  :deep(.ant-modal-header) {
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 24px;
  }

  :deep(.ant-modal-body) {
    padding: 24px;
    max-height: 70vh;
    overflow-y: auto;
  }
}

/* 确保弹窗在所有情况下都居中 */
:deep(.ant-modal-wrap) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.ant-modal) {
  position: relative !important;
  top: auto !important;
  left: auto !important;
  transform: none !important;
  margin: 0 auto !important;
}
</style>
