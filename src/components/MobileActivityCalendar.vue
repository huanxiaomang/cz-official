<template>
  <div>
    <!-- 手机端日历弹窗 -->
    <a-modal
      v-model:open="open"
      title="活动日历"
      footer=""
      width="95%"
      :centered="true"
      :mask-closable="true"
      :keyboard="true"
      :closable="true"
      :destroy-on-close="false"
      class="mobile-calendar-modal"
    >
      <!-- 月份选择器 -->
      <div class="month-selector mb-4 flex items-center justify-between">
        <button @click="previousMonth" class="month-btn">
          <div i-carbon-chevron-left text-lg />
        </button>
        <div class="current-month text-lg font-semibold">
          {{ currentMonthText }}
        </div>
        <button @click="nextMonth" class="month-btn">
          <div i-carbon-chevron-right text-lg />
        </button>
      </div>

      <!-- 日历网格 -->
      <div class="calendar-grid">
        <!-- 星期标题 -->
        <div class="weekdays">
          <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
        </div>

        <!-- 日期网格 -->
        <div class="days-grid">
          <div
            v-for="day in calendarDays"
            :key="day.date"
            class="day-cell"
            :class="{
              'other-month': !day.isCurrentMonth,
              'today': day.isToday,
              'has-events': day.hasEvents
            }"
            @click="selectDate(day)"
          >
            <div class="day-number">{{ day.dayNumber }}</div>
            <div v-if="day.hasEvents" class="event-indicator">
              <div class="event-dot"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 当日活动列表 -->
      <div v-if="selectedDateEvents.length > 0" class="events-list mt-4">
        <div class="events-title text-lg font-semibold mb-3">
          {{ selectedDateText }} 的活动
        </div>
        <div class="event-item" v-for="event in selectedDateEvents" :key="event.id" @click="showEventDetail(event)">
          <div class="event-status">
            <a-badge :status="getActivityStatusType(event.status)" />
          </div>
          <div class="event-content">
            <div class="event-title">{{ event.intro }}</div>
            <div class="event-participants">{{ event.joiners }}</div>
          </div>
          <div class="event-arrow">
            <div i-carbon-chevron-right text-gray-400 />
          </div>
        </div>
      </div>

      <div v-else-if="selectedDate" class="no-events mt-4 text-center text-gray-500">
        {{ selectedDateText }} 暂无活动
      </div>
    </a-modal>

    <!-- 活动详情弹窗 -->
    <a-modal
      v-model:open="eventDetailOpen"
      :title="selectedEvent?.intro || '活动详情'"
      footer=""
      width="90%"
      :centered="true"
      :mask-closable="true"
      :keyboard="true"
      :closable="true"
      :destroy-on-close="true"
      class="mobile-event-detail-modal"
    >
      <template v-if="selectedEvent">
        <div class="event-detail-content">
          <div class="detail-item">
            <div class="detail-label">活动状态</div>
            <div class="detail-value">
              <a-badge :status="getActivityStatusType(selectedEvent.status)" :text="getStatusText(selectedEvent.status)" />
            </div>
          </div>

          <div class="detail-item">
            <div class="detail-label">开始时间</div>
            <div class="detail-value">{{ dayjs(selectedEvent.sdate).format('YYYY年MM月DD日') }}</div>
          </div>

          <div class="detail-item">
            <div class="detail-label">结束时间</div>
            <div class="detail-value">{{ dayjs(selectedEvent.edate).format('YYYY年MM月DD日') }}</div>
          </div>

          <div class="detail-item">
            <div class="detail-label">参与人员</div>
            <div class="detail-value">{{ selectedEvent.joiners }}</div>
          </div>

          <div class="detail-item">
            <div class="detail-label">创建时间</div>
            <div class="detail-value">{{ dayjs(selectedEvent.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
          </div>

          <div class="detail-item">
            <div class="detail-label">更新时间</div>
            <div class="detail-value">{{ dayjs(selectedEvent.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
          </div>

          <div class="detail-item full-width">
            <div class="detail-label">活动详情</div>
            <div class="detail-value">{{ selectedEvent.detail }}</div>
          </div>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import { getActivitiesApi } from '~/api/activity';
import type { ActiInfo } from '#/data';
import {
  Modal as AModal,
  Badge as ABadge
} from 'ant-design-vue';

const open = ref<boolean>(false);
const eventDetailOpen = ref<boolean>(false);
const currentDate = ref<Dayjs>(dayjs());
const selectedDate = ref<Dayjs | null>(null);
const selectedEvent = ref<ActiInfo | null>(null);
const activities = ref<ActiInfo[]>([]);

const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

// 当前月份文本
const currentMonthText = computed(() => {
  return currentDate.value.format('YYYY年MM月');
});

// 选中日期文本
const selectedDateText = computed(() => {
  return selectedDate.value ? selectedDate.value.format('MM月DD日') : '';
});

// 生成日历数据
const calendarDays = computed(() => {
  const year = currentDate.value.year();
  const month = currentDate.value.month();
  const firstDay = dayjs().year(year).month(month).startOf('month');
  const lastDay = dayjs().year(year).month(month).endOf('month');

  const startDate = firstDay.startOf('week');
  const endDate = lastDay.endOf('week');

  const days = [];
  let current = startDate;

  while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
    const dayNumber = current.date();
    const isCurrentMonth = current.month() === month;
    const isToday = current.isSame(dayjs(), 'day');
    const hasEvents = activities.value.some(activity =>
      dayjs(activity.sdate).isSame(current, 'day')
    );

    days.push({
      date: current.format('YYYY-MM-DD'),
      dayNumber,
      isCurrentMonth,
      isToday,
      hasEvents,
      dayjs: current
    });

    current = current.add(1, 'day');
  }

  return days;
});

// 选中日期的活动
const selectedDateEvents = computed(() => {
  if (!selectedDate.value) return [];
  return activities.value.filter(activity =>
    dayjs(activity.sdate).isSame(selectedDate.value, 'day')
  );
});

// 获取活动状态文本
const getStatusText = (status: number): string => {
  switch (status) {
    case 0: return '未开始';
    case 1: return '进行中';
    case 2: return '已结束';
    default: return '未知状态';
  }
};

// 获取活动状态类型
const getActivityStatusType = (status: number): 'success' | 'warning' | 'error' => {
  switch (status) {
    case 0: return 'warning';
    case 1: return 'success';
    case 2: return 'error';
    default: return 'warning';
  }
};

// 获取活动数据
const fetchActivities = async () => {
  try {
    const response = await getActivitiesApi();
    activities.value = Array.isArray(response) ? response : [];

    // 统一格式化为YYYY-MM-DD格式
    activities.value.forEach(activity => {
      if (activity.sdate) {
        activity.sdate = dayjs(activity.sdate).format('YYYY-MM-DD');
      }
    });
  } catch (error) {
    console.error('获取活动数据失败:', error);
    activities.value = [];
  }
};

// 上个月
const previousMonth = () => {
  currentDate.value = currentDate.value.subtract(1, 'month');
};

// 下个月
const nextMonth = () => {
  currentDate.value = currentDate.value.add(1, 'month');
};

// 选择日期
const selectDate = (day: any) => {
  if (day.isCurrentMonth) {
    selectedDate.value = day.dayjs;
  }
};

// 显示活动详情
const showEventDetail = (event: ActiInfo) => {
  selectedEvent.value = event;
  eventDetailOpen.value = true;
};

// 监听显示日历事件
const handleShowCalendar = () => {
  open.value = true;
};

onMounted(async () => {
  await fetchActivities();
  window.addEventListener('show-mobile-calendar', handleShowCalendar);
});

onUnmounted(() => {
  window.removeEventListener('show-mobile-calendar', handleShowCalendar);
});
</script>

<style lang="scss" scoped>
.mobile-calendar-modal {
  :deep(.ant-modal) {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    margin: 0 !important;
    max-height: 90vh;
    overflow: hidden;
  }

  :deep(.ant-modal-content) {
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    max-height: 90vh;
    display: flex;
    flex-direction: column;
  }

  :deep(.ant-modal-header) {
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 20px;
  }

  :deep(.ant-modal-body) {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
  }
}

.mobile-event-detail-modal {
  :deep(.ant-modal) {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    margin: 0 !important;
    max-height: 90vh;
  }

  :deep(.ant-modal-content) {
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    max-height: 90vh;
    display: flex;
    flex-direction: column;
  }

  :deep(.ant-modal-header) {
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 20px;
  }

  :deep(.ant-modal-body) {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
  }
}

.month-selector {
  .month-btn {
    width: 40px;
    height: 40px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #f9fafb;
      border-color: #d1d5db;
    }

    &:active {
      background: #f3f4f6;
    }
  }

  .current-month {
    color: #374151;
  }
}

.calendar-grid {
  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: 8px;

    .weekday {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: #6b7280;
      font-size: 14px;
    }
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;

    .day-cell {
      height: 50px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      transition: all 0.2s;

      &:hover {
        background: #f3f4f6;
      }

      &.other-month {
        color: #d1d5db;
      }

      &.today {
        background: #3b82f6;
        color: white;
        font-weight: 600;
      }

      &.has-events {
        .event-indicator {
          position: absolute;
          bottom: 4px;

          .event-dot {
            width: 6px;
            height: 6px;
            background: #ef4444;
            border-radius: 50%;
          }
        }
      }

      .day-number {
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
}

.events-list {
  .events-title {
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 8px;
  }

  .event-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #f9fafb;
      border-color: #d1d5db;
    }

    .event-status {
      margin-right: 12px;
    }

    .event-content {
      flex: 1;

      .event-title {
        font-weight: 600;
        color: #374151;
        margin-bottom: 4px;
      }

      .event-participants {
        font-size: 12px;
        color: #6b7280;
      }
    }

    .event-arrow {
      color: #9ca3af;
    }
  }
}

.no-events {
  padding: 20px;
  color: #9ca3af;
}

.event-detail-content {
  .detail-item {
    display: flex;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f3f4f6;

    &.full-width {
      flex-direction: column;
      align-items: flex-start;
    }

    .detail-label {
      width: 80px;
      font-weight: 600;
      color: #374151;
      flex-shrink: 0;
    }

    .detail-value {
      flex: 1;
      color: #6b7280;
      word-break: break-all;
    }
  }
}
</style>
