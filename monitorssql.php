<?php 
    $queryString = $_POST['search_string'];
    $queryTag = $_POST['search_tag'];

    // echo $queryTag; echo '</br>';
    // echo $queryString;
	global $wpdb;

	$queryStringExploded = array_map('trim', explode(' ', $queryString));
	$qLength = count($queryStringExploded);

	$queryArray = array();

	// MAKE QUERY FOR EACH STRING

	// AND wp_posts.post_title LIKE '%".$queryStringExploded[$i]."%' 

// SEARCH TAXONOMIES
		// AND wp_terms.slug LIKE '%transaction%' 
  //       AND wp_terms.slug LIKE '%advisory%' 

// old query 
	// AND (wp_terms.slug LIKE '%".$queryStringExploded[$i]."%' OR wp_posts.post_content LIKE '%".$queryStringExploded[$i]."%')


	for ($i=0; $i < $qLength; $i++) { 
		array_push($queryArray,"
			AND wp_terms.slug LIKE '%".$queryStringExploded[$i]."%' ");
	}

	$implodedArray = implode( " ", $queryArray );

	// SEARCH STRING
	// ".$implodedArray."

	// SEARCH SERVICES / SOLUTIONS BY TAG
	$servicePageQuery = "
		SELECT DISTINCT wp_posts.*
		FROM wp_posts, wp_term_relationships, wp_terms, wp_term_taxonomy
		WHERE 1=1
		
		AND wp_posts.ID = wp_term_relationships.object_id
		AND wp_terms.term_id = wp_term_taxonomy.term_id
		AND wp_term_taxonomy.term_taxonomy_id = wp_term_relationships.term_taxonomy_id
		AND wp_terms.slug = '$queryTag'

		AND wp_posts.post_type IN ('solution','search-content')
		AND wp_posts.post_status = 'publish'
		AND wp_posts.post_status != 'private'
		AND wp_posts.post_status != 'future'
		AND wp_posts.post_status != 'trash' 
		
		LIMIT 0, 10
	";

	// SEARCH PEOPLE  BY TAG
	$membersQuery = "
		SELECT DISTINCT wp_posts.*
		FROM wp_posts, wp_term_relationships, wp_terms, wp_term_taxonomy
		WHERE 1=1
		
		AND wp_posts.ID = wp_term_relationships.object_id
		AND wp_terms.term_id = wp_term_taxonomy.term_id
		AND wp_term_taxonomy.term_taxonomy_id = wp_term_relationships.term_taxonomy_id
		AND wp_terms.slug = '$queryTag'

		AND wp_posts.post_type IN ('ga-team-members')
		AND wp_posts.post_status = 'publish'
		AND wp_posts.post_status != 'private'
		AND wp_posts.post_status != 'future'
		AND wp_posts.post_status != 'trash' 
		
		LIMIT 0, 10
	";

	// SEARCH INSIGHT BY TAG
	$insightQuery = "
		SELECT DISTINCT wp_posts.*
		FROM wp_posts, wp_term_relationships, wp_terms, wp_term_taxonomy
		WHERE 1=1
		
		AND wp_posts.ID = wp_term_relationships.object_id
		AND wp_terms.term_id = wp_term_taxonomy.term_id
		AND wp_term_taxonomy.term_taxonomy_id = wp_term_relationships.term_taxonomy_id
		AND wp_terms.slug = '$queryTag'

		AND wp_posts.post_type IN ('insight','industry','infographic')
		AND wp_posts.post_status = 'publish'
		AND wp_posts.post_status != 'private'
		AND wp_posts.post_status != 'future'
		AND wp_posts.post_status != 'trash'

		LIMIT 0, 10
	";

	// FOR STRINGS INPUT
	// SEARCH STRING BY SERVICES / SOLUTIONS
	$stringServicePageQuery = "
		SELECT DISTINCT wp_posts.*
		FROM wp_posts, wp_term_relationships, wp_terms, wp_term_taxonomy
		WHERE 1=1
		
		AND wp_posts.ID = wp_term_relationships.object_id
		AND wp_terms.term_id = wp_term_taxonomy.term_id
		AND wp_term_taxonomy.term_taxonomy_id = wp_term_relationships.term_taxonomy_id

		AND wp_posts.post_type IN ('solution')
		AND wp_posts.post_status = 'publish'
		AND wp_posts.post_status != 'private'
		AND wp_posts.post_status != 'future'
		AND wp_posts.post_status != 'trash'

		".$implodedArray."
		
		LIMIT 0, 10
	";

	// SEARCH STRING BY PEOPLE 
	$stringMembersQuery = "
		SELECT DISTINCT wp_posts.*
		FROM wp_posts, wp_term_relationships, wp_terms, wp_term_taxonomy
		WHERE 1=1
		
		AND wp_posts.ID = wp_term_relationships.object_id
		AND wp_terms.term_id = wp_term_taxonomy.term_id
		AND wp_term_taxonomy.term_taxonomy_id = wp_term_relationships.term_taxonomy_id
        
		AND wp_posts.post_type IN ('ga-team-members')
		AND wp_posts.post_status = 'publish'
		AND wp_posts.post_status != 'private'
		AND wp_posts.post_status != 'future'
		AND wp_posts.post_status != 'trash'

		".$implodedArray."
		
		LIMIT 0, 10
	";





	// SEARCH STRING BY INSIGHT
	$stringInsightQuery = "
		SELECT DISTINCT wp_posts.*
		FROM wp_posts, wp_term_relationships, wp_terms, wp_term_taxonomy
		WHERE 1=1
		
		AND wp_posts.ID = wp_term_relationships.object_id
		AND wp_terms.term_id = wp_term_taxonomy.term_id
		AND wp_term_taxonomy.term_taxonomy_id = wp_term_relationships.term_taxonomy_id

		AND wp_posts.post_type IN ('insight','industry','infographic')
		AND wp_posts.post_status = 'publish'
		AND wp_posts.post_status != 'private'
		AND wp_posts.post_status != 'future'
		AND wp_posts.post_status != 'trash'

		".$implodedArray."

		LIMIT 0, 10
	";

	

	// IF HAS STRING 
	if (empty($queryString)) {
		// SEARCH BY TAG
		$solutionPosts = $wpdb->get_results( $servicePageQuery );   
		$contactPosts  = $wpdb->get_results( $membersQuery );  
		$insightPosts  = $wpdb->get_results( $insightQuery );

	} else {
		// SEARCH BY STRING
		$solutionPosts = $wpdb->get_results( $stringServicePageQuery );   
		$contactPosts  = $wpdb->get_results( $stringMembersQuery );
		$insightPosts  = $wpdb->get_results( $stringInsightQuery );
	}

?>

<!-- 					     
investment-banker
asset-based-lender
private-equity
corporate-executive
attorney 
-->

<?php 

		$tagName = "";
		$tagContent = "";
		$tagSolutions = "";
		$tagContact = "";
		$tagInsights = "";

switch ($queryTag) {
	case 'investment-banker':
		# code...
		$tagName = "Corporate Advisor";
		$sectionQuote = get_field('investment_banker_quote','option');
		$tagContent = "Great American Group combines its cross-platform expertise in restructuring and liquidity with access to an enterprise’s C-level personnel to facilitate and underwrite proprietary cap market opportunities, 144A offerings, bought deals, stack IPOs, CMPOs, and ATM and baby bond offerings. Click below to learn more about the solutions we provide or contact a Great American team member.";
		$tagSolutions = "<a target='_blank' href='/solution/financial-advisory/'>Financial Advisory</a><a target='_blank' href='/solution/asset-based-lending/'>Assest Based Lending Solutions</a>";
		$tagContact = "<a target='_blank' href='/about-us/ga-leadership/'>Chad Yutka</a>";
		$tagInsights = "No insights to display.";
		break;
	case 'asset-based-lender':
		# code...
		$tagName = "Lender";
		$sectionQuote = get_field('asset_based_lender_quote','option');
		$tagContent = "Great American Group’s Corporate Advisory and Valuation Services practice facilitates loans secured by assets through an accurate valuation of all holdings, including intangibles such as intellectual property and customer relationships. Click below to learn more about the solutions we provide or contact a Great American team member.";
		$tagSolutions = "<a target='_blank' href='/solution/asset-based-lending/'>Asset Based Lending for Valuation</a><a target='_blank' href='/solution/asset-based-lending/retail-inventory/'>Retail Inventory</a><a target='_blank' href='/solution/asset-based-lending/me-for-lending/'>Machinery & Equipment Valuation for Lending</a>";
		$tagContact = "<a target='_blank' href='/about-us/ga-leadership/'>BDOs in alphabetical order</a>";
		$tagInsights = "No insights to display.";
		break;
	case 'private-equity':
		# code...
		$tagName = "Private Equity";
		$sectionQuote = get_field('private_equity_quote','option');
		$tagContent = "As we see more high net worth individuals favor investments in debt as opposed to private companies, our unique access to these investors enables us to quickly organize funds for these investments without compromising compliance. Click below to learn more about the solutions we provide or contact a Great American team member.";
		$tagSolutions = "<a target='_blank' href='/solution/financial-advisory/'>Financial Reporting Advisory</a><a target='_blank' href='/solution/financial-advisory/complex-financial-modeling/'>Complex Financial Modeling</a>";
		$tagContact = "<a target='_blank' href='/about-us/ga-leadership/'>Michael Marchlik</a>";
		$tagInsights = "<a target='_blank' href='#'>Portfolio Valuation Services</a>";
		break;
	case 'corporate-executive':
		# code...
		$tagName = "Corporate Executive";
		$sectionQuote = get_field('corporate_executive_quote','option');
		$tagContent = "Great American Group’s comprehensive expertise in valuation and its unique access to financial decision makers enables us to provide professionals, like corporate executives, realize the value of their business. Our CAVs practice helps you report on the fair value of your acquisitions, divestments, and impairments by helping you determine the best way to collateralize assets without a ready market. Click below to learn more about the solutions we provide or contact a Great American team member.";
		$tagSolutions = "<a target='_blank' href='/solution/financial-advisory/'>Financial Advisory</a><a target='_blank' href='/solution/asset-based-lending/'>Asset Based Lending for Valuation</a>";
		$tagContact = "<a target='_blank' href='/about-us/ga-leadership/'>Chad Yutka</a>";
		$tagInsights = "No insights to display";
		break;
	case 'attorney':
		# code...
		$tagName = "Attorney";
		$sectionQuote = get_field('attorney_quote','option');
		$tagContent = "Great American Group leveraged its resources and extensive industry knowledge to assist professionals, like attorneys, to achieve their goals. Click below to learn more about the solutions we provide or contact a Great American team member.";
		$tagSolutions = "<a target='_blank' href='/solution/dispute-advisory/'>Dispute Advisory</a><a target='_blank' href='/solution/dispute-advisory/expert-witness/'>Expert Witness Testimony</a>";
		$tagContact = "<a target='_blank' href='/about-us/ga-leadership/'>Chad Yutka</a>";
		$tagInsights = "No insights to display";
		break;
	default:
		# code...
		$tagName = "";
		$sectionQuote ="";
		$tagContent = "";
		$tagSolutions = "";
		$tagContact = "";
		$tagInsights = "";
		break;
}
?>

<!-- SEARCH RESULTS -->
<?php if(!empty($queryTag)): ?>
	<!-- TAG CONTENT -->
	<div class="grouptitle">
		<h2 class="serviceo">
			<?php echo $tagName; ?>
		</h2>	
	</div>

	<!-- TAG CONTENT -->
<?php endif; ?>
<?php if(!empty($queryTag)): ?>
	<?php if(!empty($sectionQuote)): ?>
	<div class="quotecontent">
		<div class="quoteo">
				<p>
					<?php echo $sectionQuote; ?>
				</p>
		</div>

	</div>
	<?php endif; ?>
<?php endif; ?>
	<!-- SERVICES -->




		<div class="servicescato ">
			<div class="monitorlist">
				<h2 class="serviceo-people">
					Solutions
				</h2>
			</div>

				<?php 
				$the_query = new WP_Query( array( 
					
					'post_type'=> array('solution'),
					'suppress_filters' => false,
					'order' => 'ASC',
					'posts_per_page' => 15,
			        'tax_query' => array(
			            array(
			                'taxonomy' => 'search-role-order',
			                'field' => 'slug',
			                'terms' => $queryTag,
			            )
			        )
					// 'orderby' =>'menu_order'
				)  );

				if ( $the_query->have_posts() ) {
				    echo '<ul class="popl">';

				    while ( $the_query->have_posts() ) {
				        $the_query->the_post();
					?>
						<li class="listresult">
							<h2 class="postitle">
								<?php if(get_field('custom_link')): ?>
									<a href="<?php the_field('custom_link'); ?>" data-gacat="Role Based Search" data-gaaction="<?php echo $queryTag; ?>/<?php the_title(); ?>" target="_blank">
										<?php the_title(); ?>
									</a>
								<?php elseif (get_field('link_location')) : ?>
									<a href="<?php the_field('link_location'); ?>" data-gacat="Role Based Search" data-gaaction="<?php echo $queryTag; ?>/<?php the_title(); ?>" target="_blank">
										<?php the_title(); ?>
									</a>
								<?php else: ?>
									<a href="<?php the_permalink(); ?>" data-gacat="Role Based Search" data-gaaction="<?php echo $queryTag; ?>/<?php the_title(); ?>" target="_blank">
										<?php the_title(); ?>
									</a>
								<?php endif; ?>
							</h2>
						</li>
					<?php
				    }
				    echo '</ul>';
				} else {
				?>
				<?php
				}
				wp_reset_postdata();
				 ?>
				<?php  /*
				$sethe_query = new WP_Query( array( 
					
					'post_type'=> array('search-content'),
					'suppress_filters' => true,
					'order' => 'ASC',
					'posts_per_page' => 15,
			        'tax_query' => array(
			            array(
			                'taxonomy' => 'search-role-order',
			                'field' => 'slug',
			                'terms' => $queryTag,
			            )
			        )
					// 'orderby' =>'menu_order'
				)  );

				if ( $sethe_query->have_posts() ) {
				    echo '<ul class="popl">';
				    
				    while ( $sethe_query->have_posts() ) {
				        $sethe_query->the_post();
					?>
						<li class="listresult">
							<h2 class="postitle">
								<?php if(get_field('custom_link')): ?>
								<a href="<?php the_field('custom_link'); ?>" target="_blank">
									<?php the_title(); ?>
								</a>
								<?php else: ?>
								<a href="<?php the_permalink(); ?>" target="_blank">
									<?php the_title(); ?>
								</a>
								<?php endif; ?>
							</h2>
						</li>
					<?php
				    }
				    echo '</ul>';
				} else {
				?>
				<?php
				}
				wp_reset_postdata(); */
				 ?>


		</div>

	<!-- SERVICES -->

	<!-- GA TEAM -->
	<?php  ?>
	<?php if (empty($queryString)) { ?>
		<div class="servicescato contactsereult">
			<div class="monitorlist">
				<h2 class="serviceo-people">
					Contacts
				</h2>
			</div>

				<?php 
				$the_query = new WP_Query( array( 
					'tag' => $queryTag,
					'post_type'=>'ga-team-members',
					'orderby'=>'name',
					'order'   => 'ASC',

				)  );

				if ( $the_query->have_posts() ) {
				    echo '<ul class="popl">';
				    while ( $the_query->have_posts() ) {
				        $the_query->the_post();
				?>
							<li class="listresult">
								<h2 class="postitle noresultso">
									<a href="#" class="readiga" data-remodal-target="modalga" data-targetpost="<?php echo get_the_ID(); ?>">
										<?php the_title(); ?> 
									</a>
								</h2>
							</li>
				<?php
				    }
				    echo '</ul>';
				} else {
				?>
					No Results
				<?php
				}
				wp_reset_postdata();
				 ?>
		</div>
		<?php } else {
		if (count($contactPosts)> 0){
		?>
		<div class="servicescato contactsereult">
			<div class="monitorlist">
				<h2 class="serviceo-people">
					Contacts
				</h2>
			</div>

				<?php 
						echo '<ul class="popl">';
						for ($i=0; $i < count($contactPosts); $i++) { 
							?>
							<li class="listresult">
								<h2 class="postitle noresultso">
									<a href="#" class="readiga" data-remodal-target="modalga" data-targetpost="<?php echo $contactPosts[$i]->ID; ?>">
										<?php echo $contactPosts[$i]->post_title; ?> 
									</a>
								</h2>
							</li>
						<?php 
						}	
						echo '</ul></div>';
					}
	}
	?>
	<?php  ?>
	<!-- GA TEAM -->

	<!-- MONITORS -->
	<?php if (empty($queryString)) { 
 
			$the_query = new WP_Query( array( 'tag' => $queryTag,'post_type'=>'insight' )  );

			if ( $the_query->have_posts() ) {

				?>
					<div class="servicescato">
						<div class="monitorlist">
							<h2 class="serviceo-people">
								Insights
							</h2>
						</div>
						<?php 
				echo '<ul class="popl">';
						
					    while ( $the_query->have_posts() ) {
					        $the_query->the_post();
					?>
								<li class="listresult">
									<h2 class="postitle noresultso">
										<a href="<?php the_permalink(); ?>">
											<?php the_title(); ?> 
										</a>
									</h2>
								</li>
					<?php
					    }
					    echo '</ul></div>';
			}
			/* Restore original Post Data */
			wp_reset_postdata();
			 ?>
				<?php
		 
		
		 ?>
	

	<?php } else {
		if (count($insightPosts)> 0){
		?>
		<div class="servicescato">
			<div class="monitorlist">
				<h2 class="serviceo-people">
					Insights
				</h2>
			</div>

				<?php 
						echo '<ul class="popl">';
						for ($i=0; $i < count($insightPosts); $i++) { 
							?>
							<li class="listresult">
								<h2 class="postitle noresultso">
									<a href="<?php echo $insightPosts[$i]->guid; ?>">
										<?php if(get_field('dates',$insightPosts[$i]->ID)){
											the_field('dates',$insightPosts[$i]->ID); ?><?php
										} else {
											echo $insightPosts[$i]->post_title;  ?><?php
										} 
										?>
									</a>
								</h2>
							</li>
						<?php 
						}	
						echo '</ul></div>';
					}
	}
	?>
	<!-- MONITORS -->

<?php 
	
	if(empty($solutionPosts) AND empty($contactPosts) AND empty($insightPosts)){
		?>

<div class="abouttagcontent">
		<div class="whitespacetag">
			<h2 class="serviceo">
				No Results	</h2>	

			<div class="contentto">
				<p>
					If there's nothing here, try the categories above.</p>

			</div>
		</div>

	</div>
			 
		<?php
			}
 ?>



<?php
die();