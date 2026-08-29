<template>
  <div
    class="font-sans relative overflow-x-hidden"
  >
    <div
      class="pointer-events-none absolute inset-0 z-[1] bg-top bg-repeat"
      :style="{
        backgroundImage: `url(${gridBackground})`,
        filter: 'invert(1) hue-rotate(180deg) opacity(0.38)'
      }"
    />
    <div class="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.08),transparent_30%),linear-gradient(180deg,rgba(31,35,41,0.08)_0%,rgba(31,35,41,0.02)_34%,rgba(31,35,41,0.18)_100%)]"></div>

    <!-- 3D Scene Background -->
    <AchievementScene :scrollProgress="scrollProgress" :introProgress="introProgress" />

    <RouterView v-slot="{ Component }">
      <component :is="Component" v-if="Component" />
      <template v-else>

        <!-- Hero Section -->
        <div
          class="min-h-[70vh] w-full flex flex-col items-center justify-start pt-[18vh] relative z-10 transition-transform duration-700"
          :style="{
            opacity: heroOpacity,
            transform: `translate3d(0, ${heroOffsetY}px, 0)`
          }"
        >
          <div class="pointer-events-auto -translate-y-[7vh] md:-translate-y-[8vh]">
            <h1 class="text-5xl md:text-7xl font-extrabold text-white tracking-widest mb-6">
              ACHIEVEMENTS
            </h1>
            <p class="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              历届赛事获奖名单及荣誉展示
            </p>
          </div>
        </div>

        <!-- 成就条列表 -->
        <div
          class="relative z-10 pb-32 min-h-screen transition-transform duration-700"
          :style="{
            opacity: detailsOpacity,
            transform: `translate3d(0, ${detailsOffsetY}px, 0)`
          }"
        >
          <div
            v-for="(winner, index) in winnersData"
            :key="winner.id"
            :ref="element => setSectionRef(element, index)"
            class="min-h-screen flex items-center relative"
            :class="index % 2 === 0 ? 'justify-start' : 'justify-end'"
          >
            <div
              @click="openWinnerDetail(winner)"
              class="relative w-[85vw] md:w-[75vw] min-h-[320px] flex items-center p-8 md:p-16 transition-transform duration-300 hover:scale-[1.02]"
              style="cursor: pointer;"
              :class="index % 2 === 0 ? '-ml-[5vw] justify-end' : '-mr-[5vw] ml-auto justify-start'"
              :style="{
                transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`
              }"
            >
              <!-- Slanted Background -->
              <div
                class="absolute top-0 left-0 w-full h-full z-0 border border-white/40 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                :style="{
                  background: 'rgba(255, 255, 255, 0.85)',
                  clipPath: index % 2 === 0
                    ? 'polygon(0% 10%, 2% 0%, 98% 5%, 100% 15%, 97% 90%, 95% 100%, 5% 95%, 0% 85%)'
                    : 'polygon(3% 5%, 5% 0%, 100% 10%, 98% 20%, 95% 95%, 100% 100%, 0% 90%, 2% 85%)'
                }"
              >
                <div
                  class="w-full h-full"
                  :style="getPanelFillStyle(index)"
                />
              </div>

              <!-- Content Layer -->
              <div
                class="relative z-10 max-w-full md:max-w-[60vw]"
                :style="{
                  transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`,
                  textAlign: index % 2 === 0 ? 'right' : 'left'
                }"
              >
                <div class="mb-3 text-xs uppercase tracking-[0.35em] text-[#0284c7]">
                  {{ getGroupLabel(winner.category) }}
                </div>

                <h2 class="relative text-3xl md:text-4xl font-black mb-5 tracking-wider text-[#1F2329]/20">
                  {{ winner.title }}
                  <span
                    class="absolute inset-0 text-[#1F2329]"
                    :style="getTitleOverlayStyle(index)"
                  >
                    {{ winner.title }}
                  </span>
                </h2>

                <div
                  class="mb-6"
                  :style="getDescriptionStyle(index)"
                >
                  <span :class="['inline-flex px-3 py-1 text-sm font-mono border rounded-full', getBadgeClass(winner.award)]">
                    {{ winner.award }}
                  </span>
                </div>

                <div
                  class="flex flex-wrap items-center gap-3"
                  :style="getDescriptionStyle(index)"
                >
                  <div
                    v-for="member in winner.members"
                    :key="member.user?.userId ?? member.sortOrder"
                    class="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1 pl-1 pr-3"
                  >
                    <img
                      class="h-8 w-8 rounded-full border border-[#38BDF8]/30 bg-[#0a0f18] object-cover"
                      :src="member.user?.avatar || winner.avatar"
                      :alt="member.user?.username || '成员'"
                    />
                    <span class="text-sm text-[#1F2329]/80">
                      {{ member.user?.username || '成员' }}
                    </span>
                  </div>
                  <div v-if="!winner.members?.length" class="text-sm text-[#1F2329]/50">暂无关联成员</div>
                </div>

                <div
                  class="mt-8 inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-[#0284c7]"
                  :style="getDetailHintStyle(index)"
                >
                  <span>查看详情</span>
                  <span class="text-[#1F2329]/55">{{ winner.members?.length || 0 }} 位成员</span>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="!winnersData.length"
            class="min-h-[40vh] flex items-center justify-center text-white/50"
          >
            暂无成就记录
          </div>
        </div>

        <Transition name="achievement-detail">
          <div
            v-if="selectedWinner"
            class="fixed inset-0 z-40 flex items-center justify-center bg-[#11151b]/78 backdrop-blur-md px-4 py-8"
            @click="closeWinnerDetail"
          >
            <div
              class="relative w-full max-w-5xl max-h-[88vh] overflow-hidden rounded-[28px] border border-[#38BDF8]/20 bg-[linear-gradient(145deg,#1f2329_0%,#151a21_100%)] shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
              @click.stop
            >
              <button
                class="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/80 transition-colors duration-200 hover:border-[#38BDF8]/30 hover:bg-[#38BDF8]/12 hover:text-white"
                @click="closeWinnerDetail"
              >
                ×
              </button>

              <div class="grid md:grid-cols-[1.1fr_1.4fr] max-h-[88vh] overflow-y-auto">
                <div class="relative min-h-[300px] md:min-h-full">
                  <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.32),transparent_50%),radial-gradient(circle_at_70%_65%,rgba(56,189,248,0.18),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
                  <div class="relative z-10 flex h-full flex-col justify-between p-8 md:p-10 text-left">
                    <div>
                      <div class="mb-4 text-xs uppercase tracking-[0.35em] text-[#38BDF8]/80">
                        Achievement Detail
                      </div>
                      <h2 class="mb-5 text-3xl md:text-4xl font-black tracking-[0.08em] text-white">
                        {{ selectedWinner.title }}
                      </h2>
                      <div class="flex flex-wrap items-center gap-3">
                        <span :class="['inline-flex px-3 py-1 text-sm font-mono border rounded-full', getBadgeClass(selectedWinner.award)]">
                          {{ selectedWinner.award }}
                        </span>
                        <span class="inline-flex px-3 py-1 text-sm border rounded-full border-[#38BDF8]/40 text-[#38BDF8] bg-[#38BDF8]/10">
                          {{ getGroupLabel(selectedWinner.category) }}
                        </span>
                      </div>
                    </div>

                    <div class="mt-8 text-sm text-white/55">
                      {{ selectedWinner.members?.length || 0 }} 位关联成员
                    </div>
                  </div>
                </div>

                <div class="p-8 md:p-10 text-left">
                  <div class="mb-6 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <h3 class="text-xl md:text-2xl font-bold text-white">关联成员</h3>
                      <p class="mt-2 text-sm text-white/55">
                        共 {{ selectedWinner.members?.length || 0 }} 位成员
                      </p>
                    </div>
                  </div>

                  <div class="space-y-3">
                    <div
                      v-for="(member, idx) in selectedWinner.members"
                      :key="member.user?.userId ?? member.sortOrder"
                      class="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-3 transition-colors duration-300 hover:border-[#38BDF8]/35 hover:bg-white/[0.06]"
                      :class="{ 'cursor-pointer': member.user?.userId }"
                      @click="goMember(member.user?.userId)"
                    >
                      <span class="w-6 shrink-0 text-center font-mono text-sm text-[#38BDF8]/80">
                        {{ idx + 1 }}
                      </span>
                      <img
                        class="h-10 w-10 rounded-full border border-[#38BDF8]/30 bg-[#0a0f18] object-cover"
                        :src="member.user?.avatar || selectedWinner.avatar"
                        :alt="member.user?.username || '成员'"
                      />
                      <span class="flex-1 truncate text-sm text-white/85">
                        {{ member.user?.username || '成员' }}
                      </span>
                      <span v-if="member.user?.major" class="hidden md:inline text-xs text-white/45">
                        {{ member.user.major }}
                      </span>
                    </div>
                    <div v-if="!selectedWinner.members?.length" class="text-sm text-white/45">暂无关联成员</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>

      </template>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue';
import { computed, nextTick, ref, watch, onMounted, onUnmounted } from 'vue';
import { getWinners, Winner } from '~/api/winners';
import AchievementScene from '~/components/achievement/AchievementScene.vue';
import gridBackground from '~/assets/images/grid-black.svg';

const winnersData = ref<Winner[]>([]);
const scrollProgress = ref(0);
const introProgress = ref(0);
const selectedWinner = ref<Winner | null>(null);
let introFrame = 0;
const sectionRefs = ref<HTMLElement[]>([]);
const sectionProgresses = ref<number[]>([]);

const CATEGORY_LABELS: Record<string, string> = {
  COMPETITION: '学科竞赛',
  SCHOLARSHIP: '荣誉奖学金',
  HONOR: '综合荣誉',
};

const heroOpacity = computed(() => introProgress.value * Math.max(0, 1 - scrollProgress.value * 5));
const heroOffsetY = computed(() => (1 - introProgress.value) * 36);
const detailsOpacity = computed(() => Math.max(0, (introProgress.value - 0.15) / 0.85));
const detailsOffsetY = computed(() => (1 - detailsOpacity.value) * 48);

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3;
}

function startIntroAnimation() {
  const duration = 1100;
  const start = performance.now();

  const tick = (now: number) => {
    const elapsed = Math.min((now - start) / duration, 1);
    introProgress.value = easeOutCubic(elapsed);

    if (elapsed < 1) {
      introFrame = requestAnimationFrame(tick);
    }
  };

  introFrame = requestAnimationFrame(tick);
}

function updateScrollProgress() {
  const documentElement = document.documentElement;
  const maxScroll = documentElement.scrollHeight - window.innerHeight;

  if (maxScroll > 0) {
    scrollProgress.value = window.scrollY / maxScroll;
  } else {
    scrollProgress.value = 0;
  }

  sectionProgresses.value = sectionRefs.value.map((element) => {
    if (!element) return 0;
    const rect = element.getBoundingClientRect();
    const start = window.innerHeight * 0.82;
    const end = window.innerHeight * 0.2;
    return clamp((start - rect.top) / (start - end), 0, 1);
  });
}

onMounted(async () => {
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();
  startIntroAnimation();

  try {
    const winners = await getWinners();
    winnersData.value = winners;
    await nextTick();
    updateScrollProgress();
  } catch (error) {
    console.error('获取获奖者数据失败:', error);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress);
  if (introFrame) {
    cancelAnimationFrame(introFrame);
  }
  document.body.style.overflow = '';
});

watch(selectedWinner, (value) => {
  document.body.style.overflow = value ? 'hidden' : '';
});

function setSectionRef(element: Element | ComponentPublicInstance | null, index: number) {
  const target
    = element instanceof HTMLElement
      ? element
      : element && '$el' in element && element.$el instanceof HTMLElement
        ? element.$el
        : null;
  if (!target) return;
  sectionRefs.value[index] = target;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getSectionProgress(index: number) {
  return sectionProgresses.value[index] ?? 0;
}

function getDetailProgress(index: number) {
  return clamp((getSectionProgress(index) - 0.38) / 0.62, 0, 1);
}

function getPanelFillStyle(index: number) {
  const progress = getSectionProgress(index);
  const direction = index % 2 === 0 ? (progress - 1) * 100 : (1 - progress) * 100;
  return {
    background: 'linear-gradient(90deg, rgba(56,189,248,0.72) 0%, rgba(56,189,248,0.82) 100%)',
    transform: `translateX(${direction}%)`,
    transition: 'transform 90ms linear',
    boxShadow: 'inset 0 0 20px rgba(255,255,255,0.15)'
  };
}

function getTitleOverlayStyle(index: number) {
  const progress = getSectionProgress(index);
  const start = index % 2 === 0 ? 0 : 100 - progress * 100;
  const end = index % 2 === 0 ? progress * 100 : 100;
  return {
    clipPath: `polygon(${start}% 0, ${end}% 0, ${end}% 100%, ${start}% 100%)`,
    color: '#ffffff',
    textShadow: progress > 0.75 ? '0 0 15px rgba(56,189,248,0.6)' : 'none',
    transition: 'clip-path 90ms linear, text-shadow 180ms ease'
  };
}

function getDescriptionStyle(index: number) {
  const progress = getDetailProgress(index);
  return {
    opacity: progress,
    transform: `translate3d(0, ${(1 - progress) * 18}px, 0)`,
    transition: 'opacity 100ms linear, transform 100ms linear'
  };
}

function getDetailHintStyle(index: number) {
  const progress = getDetailProgress(index);
  return {
    opacity: progress,
    transform: `translate3d(0, ${(1 - progress) * 18}px, 0)`,
    transition: 'opacity 120ms linear, transform 120ms linear'
  };
}

function getGroupLabel(category: string) {
  return CATEGORY_LABELS[category] || category || '综合荣誉';
}

function openWinnerDetail(winner: Winner) {
  selectedWinner.value = winner;
}

function closeWinnerDetail() {
  selectedWinner.value = null;
}

function goMember(userId?: number) {
  if (userId) {
    window.location.href = '/member';
  }
}

function getBadgeClass(award: string) {
  const value = award || '';
  if (value.includes('国')) {
    return "border-amber-400/50 bg-[#2b1d07]/90 text-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.45)]";
  }
  if (value.includes('省')) {
    return "border-sky-400/50 bg-[#082f49]/90 text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.45)]";
  }
  if (value.includes('校') || value.includes('院')) {
    return "border-emerald-400/50 bg-[#042f24]/90 text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.45)]";
  }
  return "border-slate-400/50 bg-slate-800/90 text-slate-200 shadow-[0_0_12px_rgba(148,163,184,0.35)]";
}
</script>

<style scoped>
.achievement-detail-enter-active,
.achievement-detail-leave-active {
  transition: opacity 220ms ease;
}

.achievement-detail-enter-from,
.achievement-detail-leave-to {
  opacity: 0;
}
</style>
