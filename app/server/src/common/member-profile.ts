export const ACADEMIC_YEAR_CUTOFF_MONTH = 8;
export const ACADEMIC_YEAR_CUTOFF_DAY = 20;

export const LEGACY_GRADE_TO_ADMISSION_YEAR: Record<number, number> = {
  1: 2024,
  2: 2023,
  3: 2022,
  4: 2021,
};

export const MEMBER_TYPES = ['STUDENT', 'GRADUATED', 'ADVISOR'] as const;

export type MemberType = (typeof MEMBER_TYPES)[number];

const GRADE_LABEL_MAP: Record<number, string> = {
  1: '大一',
  2: '大二',
  3: '大三',
  4: '大四',
};

export function normalizeMemberType(value?: string | null, badge?: string | null): MemberType {
  const normalized = value?.toUpperCase();
  if (normalized === 'ADVISOR' || badge?.includes('指导教师')) {
    return 'ADVISOR';
  }
  if (normalized === 'GRADUATED') {
    return 'GRADUATED';
  }
  return 'STUDENT';
}

export function resolveAdmissionYear(
  admissionYear?: number | null,
  legacyGrade?: number | null,
) {
  if (typeof admissionYear === 'number' && Number.isFinite(admissionYear)) {
    return admissionYear;
  }

  if (typeof legacyGrade === 'number') {
    return LEGACY_GRADE_TO_ADMISSION_YEAR[legacyGrade] ?? null;
  }

  return null;
}

export function getAcademicAnchorYear(now = new Date()) {
  const year = now.getFullYear();
  const cutoff = new Date(year, ACADEMIC_YEAR_CUTOFF_MONTH - 1, ACADEMIC_YEAR_CUTOFF_DAY);
  return now >= cutoff ? year : year - 1;
}

export function getComputedGrade(
  admissionYear?: number | null,
  memberType?: string | null,
  now = new Date(),
) {
  const normalizedMemberType = normalizeMemberType(memberType);
  if (normalizedMemberType !== 'STUDENT' || !admissionYear) {
    return null;
  }

  const grade = getAcademicAnchorYear(now) - admissionYear + 1;
  if (grade < 1) {
    return 1;
  }

  if (grade > 4) {
    return null;
  }

  return grade;
}

export function getAdmissionYearLabel(admissionYear?: number | null) {
  if (!admissionYear) {
    return null;
  }

  return `${String(admissionYear).slice(-2)}级`;
}

export function getMemberStatusLabel(
  admissionYear?: number | null,
  memberType?: string | null,
  now = new Date(),
) {
  const normalizedMemberType = normalizeMemberType(memberType);
  if (normalizedMemberType === 'ADVISOR') {
    return '指导老师';
  }

  if (normalizedMemberType === 'GRADUATED') {
    return '已毕业';
  }

  const grade = getComputedGrade(admissionYear, normalizedMemberType, now);
  if (!grade) {
    return '已毕业';
  }

  return GRADE_LABEL_MAP[grade];
}

export function getMemberAcademicLabel(
  admissionYear?: number | null,
  memberType?: string | null,
  now = new Date(),
) {
  const admissionYearLabel = getAdmissionYearLabel(admissionYear);
  const statusLabel = getMemberStatusLabel(admissionYear, memberType, now);

  if (statusLabel === '指导老师') {
    return statusLabel;
  }

  if (admissionYearLabel && statusLabel) {
    return `${admissionYearLabel} / ${statusLabel}`;
  }

  return statusLabel ?? admissionYearLabel;
}

export function getResolvedMemberType(
  admissionYear?: number | null,
  memberType?: string | null,
  badge?: string | null,
  now = new Date(),
) {
  const normalizedMemberType = normalizeMemberType(memberType, badge);
  if (normalizedMemberType !== 'STUDENT') {
    return normalizedMemberType;
  }

  return getComputedGrade(admissionYear, normalizedMemberType, now) ? 'STUDENT' : 'GRADUATED';
}

export function getPersistedLegacyGrade(
  admissionYear?: number | null,
  memberType?: string | null,
  now = new Date(),
) {
  const normalizedMemberType = normalizeMemberType(memberType);
  if (normalizedMemberType === 'ADVISOR' || normalizedMemberType === 'GRADUATED') {
    return 5;
  }

  return getComputedGrade(admissionYear, normalizedMemberType, now) ?? 5;
}
