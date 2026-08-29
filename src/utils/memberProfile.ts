import type { UserInfo } from '#/data';

export type MemberType = 'STUDENT' | 'GRADUATED' | 'ADVISOR';

const GRADE_LABEL_MAP: Record<number, string> = {
  1: '大一',
  2: '大二',
  3: '大三',
  4: '大四',
};

const ACADEMIC_CUTOFF_MONTH = 8;
const ACADEMIC_CUTOFF_DAY = 20;

export function normalizeMemberType(memberType?: string | null): MemberType {
  const normalized = memberType?.toUpperCase();
  if (normalized === 'ADVISOR' || normalized === 'GRADUATED') {
    return normalized;
  }

  return 'STUDENT';
}

export function getAcademicAnchorYear(now = new Date()) {
  const year = now.getFullYear();
  const cutoff = new Date(year, ACADEMIC_CUTOFF_MONTH - 1, ACADEMIC_CUTOFF_DAY);
  return now >= cutoff ? year : year - 1;
}

export function getCurrentGrade(admissionYear?: number | null, memberType?: string | null) {
  const normalizedMemberType = normalizeMemberType(memberType);
  if (normalizedMemberType !== 'STUDENT' || !admissionYear) {
    return null;
  }

  const grade = getAcademicAnchorYear() - admissionYear + 1;
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

export function getMemberStatusLabel(admissionYear?: number | null, memberType?: string | null) {
  const normalizedMemberType = normalizeMemberType(memberType);
  if (normalizedMemberType === 'ADVISOR') {
    return '指导老师';
  }

  if (normalizedMemberType === 'GRADUATED') {
    return '已毕业';
  }

  const currentGrade = getCurrentGrade(admissionYear, normalizedMemberType);
  if (!currentGrade) {
    return '已毕业';
  }

  return GRADE_LABEL_MAP[currentGrade];
}

export function getMemberAcademicLabel(userInfo: Partial<UserInfo>) {
  if (userInfo.gradeLabel) {
    return userInfo.gradeLabel;
  }

  const admissionYearLabel = getAdmissionYearLabel(userInfo.admissionYear);
  const statusLabel = getMemberStatusLabel(userInfo.admissionYear, userInfo.memberType);

  if (statusLabel === '指导老师') {
    return statusLabel;
  }

  if (admissionYearLabel && statusLabel) {
    return `${admissionYearLabel} / ${statusLabel}`;
  }

  return statusLabel ?? admissionYearLabel ?? '';
}

export function getAdmissionYearOptions(count = 8) {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: count }, (_, index) => {
    const value = currentYear - index;
    return {
      label: `${value}级`,
      value,
    };
  });
}
