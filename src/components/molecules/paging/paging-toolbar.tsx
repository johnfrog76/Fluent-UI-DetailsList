
import { FC } from "react";
import { IconButton, mergeStyleSets, Stack, Dropdown } from "@fluentui/react";
import { iPageObj } from '../../../models/paging/paging';
import { styles } from './paging-toolbar.styles';

export const DEFAULT_PAGE_SIZE = '5';

export const pageObj: iPageObj = {
  currentPage: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  firstItemNumber: 1,
  lastItemNumber: parseInt(DEFAULT_PAGE_SIZE),
  totalCount: null,
  isSortedDescending: true,
  sortKey: '',
  query: ''
};

export const clientPaginate = (items: [], start: number, end: number) => {
  if (items?.length > 0) {
    const ret = items.slice(start - 1, end);
    return ret;
  } else {
    return items;
  }
};

type pageOptionType = {
  text: string, key: string
}

interface Props {
  onPageUpdate: (page: number, size: string) => void;
  pageOptions: pageOptionType[];
  defaultOption: string;
  displayDropdown?: boolean;
  pagingInfo: iPageObj;
}

export const updatePagination = (newCurrentPage: number, newPageSize: string | null = null, pagingInfo: iPageObj, requests: any[]) => {
  let { currentPage, firstItemNumber, lastItemNumber, totalCount, pageSize } = pagingInfo;
  pageSize = newPageSize ? newPageSize : pageSize;
  let pageSizeNum: number = parseInt(pageSize);

  currentPage = newCurrentPage;
  firstItemNumber = (currentPage - 1) * pageSizeNum;
  lastItemNumber = Math.min(firstItemNumber + pageSizeNum, totalCount);
  firstItemNumber += 1;

  return {
    ...pagingInfo,
    pageSize: pageSize,
    currentPage: currentPage,
    firstItemNumber: firstItemNumber,
    lastItemNumber: lastItemNumber,
    totalCount: totalCount
  };
};

const PagingToolbarComponent: FC<Props> = ({ onPageUpdate, pageOptions, defaultOption, displayDropdown = true, ...pagingInfo }) => {

  const { currentPage, firstItemNumber, lastItemNumber, totalCount, pageSize } = pagingInfo;
  const pagingLabelTemplate = `${firstItemNumber} - ${Math.min(lastItemNumber, totalCount)} of ${totalCount} selected`;
  const handlePageClick = (type: string, size = pageSize) => {
    let page = 1;
    switch (type) {
      case 'prev':
        page = currentPage - 1;
        break;
      case 'next':
        page = currentPage + 1;
        break;
      case 'last':
        page = Math.ceil(totalCount / parseInt(pageSize));
        break;
      case 'change':
        page = 1;
        break;
      case 'first':
        page = 1;
        break;
    }

    onPageUpdate(page, size);
  };

  return (
    <Stack grow horizontal horizontalAlign="space-between" className={styles.toolbar}>
      <Stack.Item className={styles.paginglabel}>
        {
          totalCount && (
            <span title={pagingLabelTemplate}>{pagingLabelTemplate}</span>
          )
        }
        {
          displayDropdown && (
            <Dropdown
              label="Page size"
              defaultSelectedKey={pageSize}
              onChange={(evt, selection) => {
                if (selection) {
                  handlePageClick('change', String(selection.key));
                }
              }}
              className={styles.dropdownStyles}
              options={pageOptions}
            />
          )
        }
      </Stack.Item>
      <Stack.Item className={styles.pagingcontrols}>
        <IconButton
          className={styles.footericon}
          iconProps={{ iconName: "DoubleChevronLeft" }}
          title="first page"
          disabled={firstItemNumber <= 1}
          onClick={() => handlePageClick('first')}
        />
        <IconButton
          className={styles.footericon}
          iconProps={{ iconName: "ChevronLeft" }}
          title="previous page"
          disabled={firstItemNumber <= 1}
          onClick={() => handlePageClick('prev')}
        />
        <span className={styles.pageindicator}>Page {currentPage}</span>
        <IconButton
          className={styles.footericon}
          iconProps={{ iconName: "ChevronRight" }}
          title="next page"
          disabled={lastItemNumber >= totalCount}
          onClick={() => handlePageClick('next')}

        />
        <IconButton
          className={styles.footericon}
          iconProps={{ iconName: "DoubleChevronRight" }}
          title="last page"
          disabled={lastItemNumber >= totalCount}
          onClick={() => handlePageClick('last')}
        />
      </Stack.Item>
    </Stack>
  );
}

export default PagingToolbarComponent;