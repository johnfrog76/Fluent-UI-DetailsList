import { useState, useEffect, useCallback } from 'react';
import { IconButton, Stack, useTheme } from "@fluentui/react";
import { DetailsList, DetailsRow, DetailsHeader, SelectionMode, IDetailsRowStyles } from '@fluentui/react/lib/DetailsList';
import { Spinner } from '@fluentui/react';

import { iPageObj } from '../../../models/paging/paging';
import { iDetailsListColumn } from '../../../models/table/table';
import { iCompanyItem, recordStatusEnum } from '../../../models/company/company';
import { styles, spinnerStyles } from './table.styles';
import { copyAndSort } from './table.util';
import MessageBarComponent from '../message/message.component';
import CustomStatusDropdown from '../../atoms/status-dropdown/status-dropdown.component';

import CustomPanelComponent, { getEmptyCompanyItem } from '../panel/panel.component';
import CustomButtonComponent from '../../atoms/custom-button/custom-button.component';
import RequestFilterSearchBox from '../search/search-box.component';
import { getCompanies } from '../../../services/companies';
import PagingToolbarComponent, {
  pageObj,
  updatePagination,
  clientPaginate
} from '../paging/paging-toolbar';

const EditIcon = { iconName: "Edit" };
// const ViewIcon = { iconName: "View" };

const statusFilter = (value: number, items: iCompanyItem[]) => {
  if (value === -1) {
    return items.slice(0);
  } else {
    const filtered = items.slice(0).filter(s => s.column5 === value);
    return filtered;
  }
}

const TableComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagingInfo, setPagingInfo] = useState<iPageObj>(pageObj);
  const [columns, setColumns] = useState<iDetailsListColumn[]>([]);
  const [canSortColumns, setCanSortColumns] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const [createSuccess, setCreateSuccess] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [pagedRequest, setPagedRequest] = useState<iCompanyItem[] | undefined>(undefined);
  const [filteredRequest, setFilteredRequest] = useState<iCompanyItem[] | undefined>(undefined);
  const [requests, setRequests] = useState<iCompanyItem[]>([]);
  const [selectedPanelItem, setSelectedPanelItem] = useState<iCompanyItem | undefined>(undefined);
  const [data, setData] = useState<iCompanyItem[]>([]);
  const [currentDropdownValue, setCurrentDropdownValue] = useState<number>(-1);
  const [resetSearch, setResetSearch] = useState<boolean>(false);
  const { palette } = useTheme();

  const handlePageChange = (currentPage: number, pageSize: string) => {
    setPagingInfo(updatePagination(currentPage, pageSize, pagingInfo));
  };

  const dropdownStatusClear = () => {
    dropdownStatusChange(-1)
  };

  const dropdownStatusChange = (value) => {

    if (value) {
      setColumns(initColumns);
      setResetSearch(true);
      setCurrentDropdownValue(value);
      const temp = statusFilter(value, data)

      if (value === -1) {
        setFilteredRequest(undefined);
        setRequests(data)
        setPagingInfo({
          ...pagingInfo,
          currentPage: 1,
          firstItemNumber: 1,
          lastItemNumber: Number(pagingInfo.pageSize),
          totalCount: null,
          query: ''
        });
      } else {
        setFilteredRequest(temp);
        setPagingInfo({
          ...pagingInfo,
          currentPage: 1,
          firstItemNumber: 1,
          lastItemNumber: Number(pagingInfo.pageSize),
          totalCount: null,
          query: String(value)
        });
      }
    }
  };

  const handlePanelCreate = (item: iCompanyItem) => {
    // console.log('create', item.id)
    if (pagedRequest && pagedRequest.length > 0) {
      data.unshift(item);
      setRequests(data);
    }

    if (filteredRequest && filteredRequest.length > 0) {
      filteredRequest.unshift(item);
    }

    if (filteredRequest && filteredRequest.length > 0) {
      setPagingInfo({
        ...pagingInfo,
        currentPage: 1,
        firstItemNumber: 1,
        lastItemNumber: Number(pagingInfo.pageSize),
        totalCount: filteredRequest.length
      });
    } else {
      setPagingInfo({
        ...pagingInfo,
        currentPage: 1,
        firstItemNumber: 1,
        lastItemNumber: Number(pagingInfo.pageSize),
        totalCount: requests.length
      });
    }

    setCreateSuccess(true);
  };

  const handlePanelUpdate = (item: iCompanyItem) => {
    // console.log(item.id)
    if (pagedRequest && pagedRequest.length > 0) {
      const dataIdx = data.findIndex(d => d.id === item.id);
      const idx = pagedRequest.findIndex(p => p.id === item.id);
      const reqIdx = requests.findIndex(r => r.id === item.id);
      pagedRequest.splice(idx, 1, item);
      requests.splice(reqIdx, 1, item);
      data.splice(dataIdx, 1, item);
    }

    if (filteredRequest && filteredRequest.length > 0) {
      const filteredIdx = filteredRequest.findIndex(f => f.id = item.id);
      filteredRequest.splice(filteredIdx, 1, item);
    }

    setUpdateSuccess(true);
  };

  const handlePanelDismiss = () => {
    setIsOpen(false);
    setIsOpenCreate(false);
  };

  const searchHandler = (value: string) => {
    setCurrentDropdownValue(-1);
    setResetSearch(false);
    setColumns(initColumns);
    if (value) {
      const lowercaseValue = value.toLowerCase();
      const searchedRequest = data.slice(0).filter(r => {
        return (
          (r.column1 && r.column1.toLowerCase().includes(lowercaseValue)) ||
          (r.column2 && r.column2.toLowerCase().includes(lowercaseValue))
        );
      });
      setFilteredRequest(searchedRequest);
      setPagingInfo({
        ...pagingInfo,
        currentPage: 1,
        firstItemNumber: 1,
        lastItemNumber: Number(pagingInfo.pageSize),
        totalCount: null,
        query: lowercaseValue
      });
    } else {
      setFilteredRequest(undefined);
      setRequests(data);
      setPagingInfo({
        ...pagingInfo,
        currentPage: 1,
        firstItemNumber: 1,
        lastItemNumber: Number(pagingInfo.pageSize),
        totalCount: requests.length,
        query: ''
      })
    }
  };

  const onColumnClickSort = (evt: Event, column: any) => {
    if (filteredRequest && filteredRequest.length === 0) {
      setFilteredRequest(undefined);
    }
    setPagingInfo({
      ...pagingInfo,
      sortKey: column.key,
      totalCount: null,
      isSortedDescending: column.isSortedDescending ? false : true,
    })
    setCanSortColumns(true);
  };

  const renderRow = props => {
    const rowStyles: Partial<IDetailsRowStyles> = {
      root: {
        fontSize: '16px',
        color: filteredRequest ? palette['themeDarkAlt'] : 'inherit',
      },
      cell: {
        padding: '12px 12px 6px 12px'
      }
    }
    return <DetailsRow {...props} styles={rowStyles} />
  };

  const renderDetailsHeader = props => {
    const styles: Partial<any> = {
      root: {
        span: {
          fontSize: '16px',
        }
      }
    }
    return (
      <DetailsHeader {...props} styles={styles} />
    );
  };

  const cbSortData = useCallback(() => {

    if (canSortColumns === true) {
      setCanSortColumns(false);

      const myRequests = filteredRequest ? filteredRequest : requests;
      const sortedData = copyAndSort(
        myRequests,
        pagingInfo.sortKey,
        pagingInfo.isSortedDescending
      );

      const pageSizeNum = parseInt(pagingInfo.pageSize)
      setRequests(sortedData);
      setPagedRequest(clientPaginate(myRequests, 1, pageSizeNum));
    }
  }, [canSortColumns]);

  const cbSortColumns = useCallback(() => {
    const myCols = columns.map(c => {
      if (c.key === pagingInfo.sortKey) {
        return { ...c, isSorted: true, isSortedDescending: pagingInfo.isSortedDescending }
      } else {
        return { ...c, isSorted: false, isSortedDescending: false }
      }
    });
    setColumns(myCols);
    cbSortData();
  }, [canSortColumns]);

  useEffect(() => {
    setColumns(initColumns);
    getCompanies(1500).then(resp => {
      setRequests(resp);
      setData(resp)
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setPagingInfo({
        ...pagingInfo,
        totalCount: requests.length
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (pagingInfo.query.length > 0 && filteredRequest) {
      setPagingInfo({
        ...pagingInfo,
        totalCount: filteredRequest?.length || null,
        firstItemNumber: 1,
        lastItemNumber: parseInt(pagingInfo.pageSize)
      });
    } else {
      setPagingInfo({
        ...pagingInfo,
        totalCount: requests?.length || null,
        query: '',
        firstItemNumber: 1,
        lastItemNumber: parseInt(pagingInfo.pageSize)
      });
    }
    if (canSortColumns) {
      cbSortColumns();
    }
  }, [filteredRequest, canSortColumns])

  useEffect(() => {
    if (pagingInfo.query.length > 0 && filteredRequest) {
      setPagedRequest(clientPaginate(filteredRequest, pagingInfo.firstItemNumber, pagingInfo.lastItemNumber));
    } else {
      setPagedRequest(clientPaginate(requests, pagingInfo.firstItemNumber, pagingInfo.lastItemNumber));
    }
  }, [pagingInfo]);

  const initColumns: iDetailsListColumn[] = [
    {
      key: "editStatus",
      name: "",
      fieldName: "",
      minWidth: 20,
      maxWidth: 20,
      isResizable: false,
      onRender: (item) => {
        return (
          <IconButton
            iconProps={EditIcon}
            onClick={() => {
              setIsOpen(true);
              setSelectedPanelItem(item)
            }}
          />
        );
      }
    },
    {
      key: "column1",
      name: "Company",
      fieldName: "column1",
      minWidth: 80,
      maxWidth: 100,
      data: "string",
      onColumnClick: (ev, column) => { onColumnClickSort(ev, column) },
      isResizable: true,
    },
    {
      key: "column2",
      name: "CEO",
      fieldName: "column2",
      minWidth: 80,
      maxWidth: 180,
      data: "string",
      onColumnClick: (ev, column) => { onColumnClickSort(ev, column) },
      isResizable: true,
    },
    {
      key: "column5",
      name: "Status",
      fieldName: "column5",
      minWidth: 100,
      maxWidth: 120,
      onColumnClick: (ev, column) => { onColumnClickSort(ev, column) },
      data: "number",
      isResizable: true,
      onRender: (item) => {
        type colorMapType = {
          [key: number]: string;
        }
        const itemVal = recordStatusEnum[item['column5']];
        const colorMap: colorMapType = {
          1: '#00B8D4',
          2: '#00BFA5',
          3: '#64DD17',
          4: '#FF80AB',
          5: '#FFEA00',
          6: '#81C784'
        };

        return (
          <span
            className={styles.pill}
            style={{
              backgroundColor: colorMap[item['column5']],
              borderColor: colorMap[item['column5']]
            }}
          >{itemVal.toUpperCase()}
          </span>
        )
      }
    },
    {
      key: "column3",
      name: "Earnings",
      fieldName: "column3",
      minWidth: 100,
      maxWidth: 120,
      onColumnClick: (ev, column) => { onColumnClickSort(ev, column) },
      data: "string",
      isResizable: true,
      onRender: (item) => {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        return formatter.format(item['column3']);
      }
    },
    {
      key: "column4",
      name: "Date",
      fieldName: "column4",
      minWidth: 100,
      maxWidth: 130,
      onColumnClick: (ev, column) => { onColumnClickSort(ev, column) },
      data: "number",
      isResizable: true,
      onRender: (item) => {
        const d = new Date(item['column4']).toDateString();
        return d;
      }
    },
  ];

  const Table = () => (
    <>
      {
        !isLoading ? (
          <>
            <DetailsList
              items={pagedRequest}
              columns={columns}
              selectionMode={SelectionMode.none}
              isHeaderVisible={true}
              className={styles.listStyle}
              onRenderRow={renderRow}
              onRenderDetailsHeader={renderDetailsHeader}
            />
            <PagingToolbarComponent
              onPageUpdate={(currentPage, pageSize) => handlePageChange(currentPage, pageSize)}
              {...pagingInfo}
              pageOptions={[
                { text: "5", key: "5" },
                { text: "10", key: "10" },
                { text: "20", key: "20" },
              ]}
            />
          </>

        ) : (
          <Spinner size={3} styles={spinnerStyles} label="loading..." />
        )
      }
    </>
  );

  return (
    <>
      <CustomPanelComponent
        isOpen={isOpenCreate}
        headerText="Create New Item"
        item={getEmptyCompanyItem()}
        onDismiss={() => handlePanelDismiss()}
        onSubmit={(item) => handlePanelCreate(item)}
      />
      <CustomPanelComponent
        isOpen={isOpen}
        headerText="Edit Company Details"
        item={selectedPanelItem}
        onDismiss={() => handlePanelDismiss()}
        onSubmit={(item) => handlePanelUpdate(item)}
      />
      {
        createSuccess && (
          <MessageBarComponent
            type="success"
            text="Create Success"
            closeDelay={8}
            onClose={() => setCreateSuccess(false)}
          />
        )
      }
      {
        updateSuccess && (
          <MessageBarComponent
            type="success"
            text="Update Success"
            closeDelay={8}
            onClose={() => setUpdateSuccess(false)}
          />
        )
      }
      <h3 className={styles.tableHeading}>Company Data</h3>
      <div>
        {!isLoading && (
          <Stack className={styles.tableToolbar} horizontal horizontalAlign='space-between' reversed>
            <Stack className={styles.addButtonWrap}>
              <CustomButtonComponent
                handleClick={() => setIsOpenCreate(true)}
                iconName="Add"
                primary={true}
                text="Add"
              />
            </Stack>
            <Stack className={styles.filtersWrapper} horizontal horizontalAlign='space-between'>
              <RequestFilterSearchBox
                search={(value: string) => searchHandler(value)}
                placeholder="Search"
                labelText="Search Company and CEO"
                showSearchButton={true}
                reset={resetSearch}
              />
              <CustomStatusDropdown
                label="Filter Status"
                onClearValue={() => dropdownStatusClear()}
                handleChange={(evt) => {
                  const value = evt.target.value.key;
                  dropdownStatusChange(value);
                }}
                currentValue={currentDropdownValue}
              />
            </Stack>
          </Stack>
        )
        }
        {filteredRequest === undefined || filteredRequest.length > 0 ? (
          <Table />
        ) : (
          <div>no results</div>
        )}
      </div>
    </>
  );
};

export default TableComponent;