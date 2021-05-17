import { HeaderContainer, Modal } from 'carbon-components-react';
import {Header} from 'carbon-components-react';
import { SkipToContent} from 'carbon-components-react';
import {HeaderMenuButton} from 'carbon-components-react';
import {HeaderName,HeaderMenuItem,DataTable,TableContainer,Table,TableHead,TableHeader,TableRow,TableBody,TableCell,HeaderMenu,HeaderSideNavItems,SideNav,HeaderNavigation,SideNavItems} from 'carbon-components-react';
import React from 'react';
import { Component } from 'react';


class NavCarbon extends Component {
  constructor(props){
      super(props)
      this.state={
        opened:false
      }
  }
  render(){
    const headerData={
      'key':'header',
      'value':'sample'
    }
    const rowData={
      'header':'sample'
    }

    return(
      <div>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="IBM Platform Name">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName href="#" prefix="IBM">
          [Platform]
        </HeaderName>
        <HeaderNavigation aria-label="IBM [Platform]">
          <HeaderMenuItem isCurrentPage onClick={()=>this.setState({opened:true})}>
            About DataSet
          </HeaderMenuItem>
          
          
        </HeaderNavigation>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}>
          <SideNavItems>
            <HeaderSideNavItems>
              <HeaderMenuItem onClick={()=>this.setState({opened:true})}>About DataSet</HeaderMenuItem>
              
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
      </Header>
      
    )}
    
  />
  <Modal
    open={this.state.opened}
    onRequestClose={()=>this.setState({opened:false})}
    size="md"
    modalLabel="About the API"
    passiveModal
  >
    <h1>This is the data set</h1>
    
  </Modal>
    </div>
    )
  }
}
  
    
 
   
   

       

export default NavCarbon;